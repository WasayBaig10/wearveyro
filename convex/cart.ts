import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

const cartItemFields = v.object({
  productId: v.id("products"),
  name: v.string(),
  price: v.string(),
  priceValue: v.number(),
  imageUrl: v.string(),
  quantity: v.number(),
  size: v.optional(v.string()),
});

export const getCart = query({
  args: { userId: v.string() },
  handler: async (ctx, args) => {
    const cart = await ctx.db
      .query("carts")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .unique();
    return cart?.items ?? [];
  },
});

export const saveCart = mutation({
  args: {
    userId: v.string(),
    items: v.array(cartItemFields),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("carts")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .unique();
    if (existing) {
      await ctx.db.patch(existing._id, { items: args.items });
    } else {
      await ctx.db.insert("carts", {
        userId: args.userId,
        items: args.items,
      });
    }
  },
});
