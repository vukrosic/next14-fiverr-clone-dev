import { v } from "convex/values";
import { query } from "./_generated/server";

export const getByGig = query({
    args: { gigId: v.id("gigs") },
    handler: async (ctx, args) => {
        const reviews = await ctx.db
            .query("reviews")
            .withIndex("by_gigId", (q) => q.eq("gigId", args.gigId))
            .collect();
        return reviews;
    },
});

export const getBySellerName = query({
    args: { sellerName: v.string() },
    handler: async (ctx, args) => {
        const seller = await ctx.db
            .query("users")
            .withIndex("by_username", (q) => q.eq("username", args.sellerName))
            .unique();

        if (!seller) {
            throw new Error("Seller not found");
        }

        const reviews = await ctx.db
            .query("reviews")
            .withIndex("by_sellerId", (q) => q.eq("sellerId", seller._id))
            .collect();
        return reviews;
    },
});