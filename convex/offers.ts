import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

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

// gigId: v.id("gigs"),
// title: v.string(),
// description: v.string(),
// tier: v.union(
//     v.literal("Basic"),
//     v.literal("Standard"),
//     v.literal("Premium")
// ),
// price: v.number(),
// delivery_days: v.string(),
// revisions: v.number(),

export const upsert = mutation({
    args: {
        gigId: v.id("gigs"),
        title: v.string(),
        description: v.string(),
        tier: v.union(v.literal("Basic"), v.literal("Standard"), v.literal("Premium")),
        price: v.number(),
        delivery_days: v.number(),
        revisions: v.number(),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized");
        }

        const offer = await ctx.db
            .query("offers")
            .withIndex("by_gigId_tier", (q) =>
                q
                    .eq("gigId", args.gigId)
                    .eq("tier", args.tier)
            )
            .unique();

        if (!offer) {
            const offerId = await ctx.db.insert("offers", {
                gigId: args.gigId,
                title: args.title,
                description: args.description,
                tier: args.tier,
                price: args.price,
                delivery_days: args.delivery_days,
                revisions: args.revisions,
            });
            return offerId;
        }

        await ctx.db.patch(offer._id, {
            title: args.title,
            description: args.description,
            price: args.price,
            delivery_days: args.delivery_days,
            revisions: args.revisions,
        });

    },
});