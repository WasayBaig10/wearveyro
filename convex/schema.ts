import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  products: defineTable({
    name: v.string(),
    price: v.string(),
    priceValue: v.number(),
    description: v.string(),
    category: v.string(),
    imageId: v.optional(v.id("_storage")),
    imageSecondaryId: v.optional(v.id("_storage")),
    imageUrl: v.optional(v.string()),
    imageSecondaryUrl: v.optional(v.string()),
    stock: v.number(),
    sizes: v.array(v.string()),
    status: v.union(v.literal("active"), v.literal("draft"), v.literal("soldout")),
    inventoryPercent: v.optional(v.number()),
    slug: v.string(),
  })
    .index("by_category", ["category"])
    .index("by_slug", ["slug"]),

  orders: defineTable({
    orderId: v.string(),
    status: v.union(v.literal("pending"), v.literal("shipped"), v.literal("delivered")),
    total: v.number(),
    items: v.array(
      v.object({
        productId: v.id("products"),
        name: v.string(),
        price: v.string(),
        quantity: v.number(),
        size: v.optional(v.string()),
      })
    ),
    customerName: v.string(),
    userId: v.optional(v.string()),
    date: v.number(),
  })
    .index("by_orderId", ["orderId"])
    .index("by_userId", ["userId"]),

  customers: defineTable({
    name: v.string(),
    email: v.string(),
    userId: v.optional(v.string()),
    totalSpent: v.number(),
    lastOrderDate: v.number(),
  }).index("by_email", ["email"]),

  users: defineTable({
    name: v.string(),
    email: v.string(),
    clerkId: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_email", ["email"]),

  carts: defineTable({
    userId: v.string(),
    items: v.array(
      v.object({
        productId: v.id("products"),
        name: v.string(),
        price: v.string(),
        priceValue: v.number(),
        imageUrl: v.string(),
        quantity: v.number(),
        size: v.optional(v.string()),
      })
    ),
  }).index("by_userId", ["userId"]),
});
