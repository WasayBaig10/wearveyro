import { mutation } from "./_generated/server";

export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    const existingOrders = await ctx.db.query("orders").collect();
    if (existingOrders.length > 0) {
      return { seeded: false, message: "Data already exists — skipping." };
    }

    const products = await ctx.db.query("products").collect();
    if (products.length === 0) {
      return { seeded: false, message: "No products found — seed products first." };
    }

    const [p1, p2, p3] = products.slice(0, 3);

    const now = Date.now();
    const day = 86400000;

    const c1 = await ctx.db.insert("customers", {
      name: "Zara Vance",
      email: "zara.vance@resilio.co",
      totalSpent: 18400,
      lastOrderDate: now - day * 2,
    });
    const c2 = await ctx.db.insert("customers", {
      name: "Kai Okonkwo",
      email: "kai.o@neuralbase.io",
      totalSpent: 7200,
      lastOrderDate: now - day * 14,
    });
    const c3 = await ctx.db.insert("customers", {
      name: "Lena Volkov",
      email: "lena.v@cypher.pw",
      totalSpent: 31500,
      lastOrderDate: now - day * 45,
    });

    await ctx.db.insert("orders", {
      orderId: "ORD-2026-001",
      status: "delivered",
      total: 4800,
      items: p1
        ? [{ productId: p1._id, name: p1.name, price: p1.price, quantity: 1, size: "M" }]
        : [],
      customerName: "Zara Vance",
      date: now - day * 2,
    });

    await ctx.db.insert("orders", {
      orderId: "ORD-2026-002",
      status: "shipped",
      total: 7200,
      items: p2
        ? [{ productId: p2._id, name: p2.name, price: p2.price, quantity: 2, size: "L" }]
        : [],
      customerName: "Kai Okonkwo",
      date: now - day * 4,
    });

    await ctx.db.insert("orders", {
      orderId: "ORD-2026-003",
      status: "pending",
      total: 12600,
      items: p1 && p3
        ? [
            { productId: p1._id, name: p1.name, price: p1.price, quantity: 1, size: "S" },
            { productId: p3._id, name: p3.name, price: p3.price, quantity: 3, size: "XL" },
          ]
        : [],
      customerName: "Lena Volkov",
      date: now - day * 1,
    });

    return { seeded: true, orders: 3, customers: 3 };
  },
});
