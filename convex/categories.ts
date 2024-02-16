import { v } from "convex/values";
import { query } from "./_generated/server";

export const get = query({
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized");
        }
        const categories = await ctx.db.query("categories").collect();
        return categories;
    }
});