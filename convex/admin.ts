import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const verifyAdminPassword = mutation({
  args: { password: v.string() },
  handler: async (_ctx, args) => {
    const adminPassword = process.env.ADMIN_SECRET_PASSWORD;
    if (!adminPassword) {
      console.error("ADMIN_SECRET_PASSWORD environment variable is not set");
      return false;
    }
    return args.password === adminPassword;
  },
});
