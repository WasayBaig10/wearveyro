import { internalMutation, mutation, query } from "./_generated/server";
import { api } from "./_generated/api";
import { ConvexError, v } from "convex/values";

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
    status: v.union(v.literal("pending"), v.literal("confirmed"), v.literal("shipped"), v.literal("delivered")),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { status: args.status });
  },
});

export const getOrderByDisplayId = query({
  args: { orderId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("orders")
      .withIndex("by_orderId", (q) => q.eq("orderId", args.orderId))
      .unique();
  },
});

export const confirmByOrderId = internalMutation({
  args: { orderId: v.string() },
  handler: async (ctx, args) => {
    const order = await ctx.db
      .query("orders")
      .withIndex("by_orderId", (q) => q.eq("orderId", args.orderId))
      .unique();

    if (!order) throw new Error(`Order ${args.orderId} not found.`);
    if (order.status !== "pending") throw new Error(`Order ${args.orderId} is not pending.`);

    await ctx.db.patch(order._id, { status: "confirmed" });
  },
});

export const checkout = mutation({
  args: {
    items: v.array(
      v.object({
        productId: v.id("products"),
        quantity: v.number(),
        size: v.optional(v.string()),
      })
    ),
    customerName: v.optional(v.string()),
    email: v.optional(v.string()),
    phone: v.optional(v.string()),
    address: v.optional(v.string()),
    city: v.optional(v.string()),
    postalCode: v.optional(v.string()),
    userId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let identity = null;
    try {
      identity = await ctx.auth.getUserIdentity();
    } catch (err) {
      console.error("[checkout] getUserIdentity failed:", err);
      identity = null;
    }

    // Guests may checkout without signing in; the order is still stored
    // with an optional userId so it can be linked to an account later.
    const effectiveUserId = identity?.subject ?? args.userId;

    // Defensive fallbacks for incoming form values.
    const customerName = (args.customerName ?? "").trim() || "Guest";
    const email = (args.email ?? "").trim();
    const phone = (args.phone ?? "").trim();
    const address = (args.address ?? "").trim();
    const city = (args.city ?? "").trim();
    const postalCode = (args.postalCode ?? "").trim();

    if (args.items.length === 0) {
      return {
        ok: false as const,
        error: "empty_cart",
        message: "Your cart is empty.",
      };
    }

    let total = 0;
    const orderItems: Array<{
      productId: typeof args.items[number]["productId"];
      name: string;
      price: string;
      quantity: number;
      size: string;
    }> = [];

    for (const { productId, quantity, size } of args.items) {
      const qty = Number.isInteger(quantity) ? quantity : 1;
      if (qty < 1) {
        return {
          ok: false as const,
          error: "invalid_quantity",
          message: "Item quantity must be a positive integer.",
        };
      }

      // Exact record lookup by the cart item's product ID — never a
      // name/slug match that could resolve to a different (e.g. sold-out)
      // variant sharing the same product name.
      const product = await ctx.db.get(productId);
      if (!product) {
        return {
          ok: false as const,
          error: "product_not_found",
          message: `A cart item is no longer available.`,
        };
      }
      if (product.status === "draft") {
        return {
          ok: false as const,
          error: "unavailable",
          message: `${product.name} is not available for purchase.`,
        };
      }
      if (product.status === "soldout") {
        return {
          ok: false as const,
          error: "insufficient_stock",
          message: `${product.name} is sold out and cannot be ordered.`,
        };
      }
      if (product.stock < qty) {
        return {
          ok: false as const,
          error: "insufficient_stock",
          message: `${product.name} is out of stock — only ${product.stock} available.`,
        };
      }
      await ctx.db.patch(productId, { stock: product.stock - qty });
      total += product.priceValue * qty;
      orderItems.push({
        productId,
        name: product.name,
        price: product.price,
        quantity: qty,
        size: size?.trim() || "OS",
      });
    }

    const orderId = `ORD-${Date.now()}`;

    try {
      await ctx.db.insert("orders", {
        orderId,
        status: "pending",
        total,
        items: orderItems,
        customerName,
        customerEmail: email,
        customerPhone: phone,
        address,
        city,
        postalCode,
        userId: effectiveUserId,
        date: Date.now(),
      });
    } catch (err) {
      console.error("[checkout] Failed to insert order:", err);
      throw new ConvexError("Failed to place order. Please try again.");
    }

    // Non-blocking WhatsApp alert to admin
    try {
      await ctx.scheduler.runAfter(0, api.whatsapp.sendNewOrderAlert, {
        orderId,
        customerName,
        total,
      });
    } catch (err) {
      console.error("[checkout] Failed to schedule WhatsApp alert:", err);
    }

    // Non-blocking confirmation email to customer
    try {
      await ctx.scheduler.runAfter(0, api.email.sendOrderConfirmation, {
        customerName,
        customerEmail: email,
        orderId,
        total,
        items: orderItems.map((item) => ({
          name: item.name,
          size: item.size,
          quantity: item.quantity,
          price: item.price,
        })),
      });
    } catch (err) {
      console.error("[checkout] Failed to schedule confirmation email:", err);
    }

    // Non-blocking admin notification email with full shipping details
    try {
      await ctx.scheduler.runAfter(0, api.email.sendOrderAdminNotification, {
        customerName,
        customerEmail: email,
        customerPhone: phone,
        address,
        city,
        postalCode,
        orderId,
        total,
        items: orderItems.map((item) => ({
          name: item.name,
          size: item.size,
          quantity: item.quantity,
          price: item.price,
        })),
      });
    } catch (err) {
      console.error("[checkout] Failed to schedule admin email:", err);
    }

    try {
      const existingCustomer = await ctx.db
        .query("customers")
        .withIndex("by_email", (q) => q.eq("email", email))
        .unique();

      if (existingCustomer) {
        await ctx.db.patch(existingCustomer._id, {
          totalSpent: existingCustomer.totalSpent + total,
          lastOrderDate: Date.now(),
        });
      } else {
        await ctx.db.insert("customers", {
          name: customerName,
          email,
          userId: effectiveUserId,
          totalSpent: total,
          lastOrderDate: Date.now(),
        });
      }
    } catch (err) {
      console.error("[checkout] Failed to upsert customer:", err);
    }

    return { ok: true as const, orderId, total };
  },
});
