import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createReview = mutation({
  args: {
    productId: v.id("products"),
    userId: v.string(),
    orderId: v.id("orders"),
    rating: v.number(),
    comment: v.string(),
    title: v.optional(v.string()),
    userName: v.optional(v.string()),
    imageStorageId: v.optional(v.id("_storage")),
  },
  handler: async (ctx, args) => {
    // Verify the order exists and is delivered
    const order = await ctx.db.get(args.orderId);
    if (!order) {
      throw new Error("Order not found");
    }
    if (order.status !== "delivered") {
      throw new Error("Only verified buyers who have received this item can leave a review");
    }

    // Verify the order contains this product
    const hasProduct = order.items.some((item) => item.productId === args.productId);
    if (!hasProduct) {
      throw new Error("This order does not contain the product you're trying to review");
    }

    // Verify the user owns this order
    if (order.userId !== args.userId) {
      throw new Error("Unauthorized: You can only review products from your own orders");
    }

    // Check if user already reviewed this product for this order
    const existingReview = await ctx.db
      .query("reviews")
      .withIndex("by_productId_userId", (q) => q.eq("productId", args.productId).eq("userId", args.userId))
      .filter((q) => q.eq(q.field("orderId"), args.orderId))
      .unique();

    if (existingReview) {
      throw new Error("You have already reviewed this product for this order");
    }

    // Validate rating
    if (args.rating < 1 || args.rating > 5 || !Number.isInteger(args.rating)) {
      throw new Error("Rating must be an integer between 1 and 5");
    }

    // Validate comment
    if (!args.comment.trim() || args.comment.trim().length < 10) {
      throw new Error("Review comment must be at least 10 characters");
    }
    if (args.comment.trim().length > 2000) {
      throw new Error("Review comment must be less than 2000 characters");
    }

    // Validate title if provided
    if (args.title !== undefined && args.title.trim().length > 100) {
      throw new Error("Review title must be less than 100 characters");
    }

    return await ctx.db.insert("reviews", {
      productId: args.productId,
      userId: args.userId,
      orderId: args.orderId,
      rating: args.rating,
      comment: args.comment.trim(),
      title: args.title?.trim() ?? undefined,
      userName: args.userName?.trim() ?? undefined,
      imageStorageId: args.imageStorageId,
      createdAt: Date.now(),
    });
  },
});

export const getReviewsByProduct = query({
  args: {
    productId: v.id("products"),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 50;
    return await ctx.db
      .query("reviews")
      .withIndex("by_productId", (q) => q.eq("productId", args.productId))
      .order("desc")
      .take(limit);
  },
});

export const getRandomReviews = query({
  args: {
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 6;
    const allReviews = await ctx.db.query("reviews").order("desc").collect();
    if (allReviews.length === 0) return [];

    // Shuffle and take up to limit
    const shuffled = [...allReviews].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, limit);
  },
});

export const getReviewStats = query({
  args: {
    productId: v.id("products"),
  },
  handler: async (ctx, args) => {
    const reviews = await ctx.db
      .query("reviews")
      .withIndex("by_productId", (q) => q.eq("productId", args.productId))
      .collect();

    if (reviews.length === 0) {
      return { averageRating: 0, totalReviews: 0, ratingBreakdown: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } };
    }

    const totalReviews = reviews.length;
    const sumRating = reviews.reduce((sum, r) => sum + r.rating, 0);
    const averageRating = sumRating / totalReviews;

    const ratingBreakdown = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    reviews.forEach((r) => {
      ratingBreakdown[r.rating as keyof typeof ratingBreakdown]++;
    });

    return { averageRating, totalReviews, ratingBreakdown };
  },
});

export const canUserReviewProduct = query({
  args: {
    productId: v.id("products"),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    // Find delivered orders for this user containing this product
    const orders = await ctx.db
      .query("orders")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .filter((q) => q.eq(q.field("status"), "delivered"))
      .collect();

    const eligibleOrders = orders.filter((order) =>
      order.items.some((item) => item.productId === args.productId)
    );

    if (eligibleOrders.length === 0) {
      return { canReview: false, reason: "You haven't received this item yet. Only verified buyers who have received this item can leave a review." };
    }

    // Check if user already reviewed for any of these orders
    for (const order of eligibleOrders) {
      const existingReview = await ctx.db
        .query("reviews")
        .withIndex("by_productId_userId", (q) => q.eq("productId", args.productId).eq("userId", args.userId))
        .filter((q) => q.eq(q.field("orderId"), order._id))
        .unique();

      if (existingReview) {
        return { canReview: false, reason: "You have already reviewed this product for this order", alreadyReviewed: true };
      }
    }

    return { canReview: true, eligibleOrders };
  },
});

export const getUserReviewForProduct = query({
  args: {
    productId: v.id("products"),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("reviews")
      .withIndex("by_productId_userId", (q) => q.eq("productId", args.productId).eq("userId", args.userId))
      .order("desc")
      .first();
  },
});

export const generateReviewImageUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    const uploadUrl = await ctx.storage.generateUploadUrl();
    return { uploadUrl };
  },
});