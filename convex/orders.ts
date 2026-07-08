import { mutation, query } from "./_generated/server";
import { api } from "./_generated/api";
import { v } from "convex/values";

export const listOrders = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("orders").collect();
  },
});

export const listUserOrders = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("orders")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect();
  },
});

export const getOrderWithProducts = query({
  args: { orderId: v.id("orders") },
  handler: async (ctx, args) => {
    const order = await ctx.db.get(args.orderId);
    if (!order) return null;

    const items = await Promise.all(
      order.items.map(async (item) => {
        const product = await ctx.db.get(item.productId);
        return {
          _id: item.productId,
          name: item.name,
          price: item.price,
          priceValue: product?.priceValue ?? 0,
          imageUrl: product?.imageUrl ?? null,
          quantity: item.quantity,
          size: item.size,
        };
      })
    );

    return { ...order, items };
  },
});

export const updateOrderStatus = mutation({
  args: {
    id: v.id("orders"),
    status: v.union(v.literal("pending"), v.literal("shipped"), v.literal("delivered")),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { status: args.status });
  },
});

export const checkout = mutation({
  args: {
    items: v.array(
      v.object({
        productId: v.id("products"),
        quantity: v.number(),
        size: v.string(),
      })
    ),
    customerName: v.string(),
    email: v.string(),
    userId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let total = 0;
    const orderItems: Array<{
      productId: typeof args.items[number]["productId"];
      name: string;
      price: string;
      quantity: number;
      size: string;
    }> = [];

    for (const { productId, quantity, size } of args.items) {
      const product = await ctx.db.get(productId);
      if (!product) {
        throw new Error(`Product ${productId} not found.`);
      }
      if (product.stock < quantity) {
        throw new Error(`${product.name} has insufficient stock.`);
      }
      await ctx.db.patch(productId, { stock: product.stock - quantity });
      total += product.priceValue * quantity;
      orderItems.push({
        productId,
        name: product.name,
        price: product.price,
        quantity,
        size,
      });
    }

    const orderId = `ORD-${Date.now()}`;

    await ctx.db.insert("orders", {
      orderId,
      status: "pending",
      total,
      items: orderItems,
      customerName: args.customerName,
      userId: args.userId,
      date: Date.now(),
    });

    // Schedule confirmation email
    await ctx.scheduler.runAfter(0, api.email.sendOrderConfirmation, {
      customerName: args.customerName,
      customerEmail: args.email,
      orderId,
      total,
      items: orderItems.map((item) => ({
        name: item.name,
        size: item.size,
        quantity: item.quantity,
        price: item.price,
      })),
    });

    const existingCustomer = await ctx.db
      .query("customers")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .unique();

    if (existingCustomer) {
      await ctx.db.patch(existingCustomer._id, {
        totalSpent: existingCustomer.totalSpent + total,
        lastOrderDate: Date.now(),
      });
    } else {
      await ctx.db.insert("customers", {
        name: args.customerName,
        email: args.email,
        userId: args.userId,
        totalSpent: total,
        lastOrderDate: Date.now(),
      });
    }

    return { orderId, total };
  },
});
