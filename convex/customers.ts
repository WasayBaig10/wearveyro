import { query } from "./_generated/server";

export const listCustomers = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("customers").collect();
  },
});
