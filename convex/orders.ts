import { v } from "convex/values";
import { query } from "./_generated/server";

export const getByGig = query({
    args: {
        gigId: v.id("gigs"),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized");
        }

        const orders = await ctx.db
            .query("orders")
            .withIndex("by_gigId", (q) => q.eq("gigId", args.gigId))
            .collect();

        return orders;
    },
});

export const getOrderNumberByGig = query({
    args: {
        gigId: v.id("gigs"),
    },
    handler: async (ctx, args) => {
        const orders = await ctx.db
            .query("orders")
            .withIndex("by_gigId", (q) => q.eq("gigId", args.gigId))
            .collect();

        return orders.length;
    },
});

// export const getByUser = query({
//     args: {
//         userId: v.id("users"),
//     },
//     handler: async (ctx, args) => {
//         const identity = await ctx.auth.getUserIdentity();

//         if (!identity) {
//             throw new Error("Unauthorized");
//         }

//         const orders = await ctx.db
//             .query("orders")
//             .withIndex("by_userId", (q) => q.eq("userId", args.userId))
//             .collect();

//         return orders;
//     },
// });