import { v } from "convex/values";
import { query } from "./_generated/server";

export const get = query({
    args: { gigId: v.id("gigs") },
    handler: async (ctx, args) => {
        const offers = await ctx.db
            .query("offers")
            .withIndex("by_gigId", (q) => q.eq("gigId", args.gigId))
            .collect();
        return offers;
    },
});