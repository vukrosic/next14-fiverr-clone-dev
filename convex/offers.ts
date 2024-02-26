import { v } from "convex/values";
import { action, internalAction, internalMutation, internalQuery, mutation, query } from "./_generated/server";
import Stripe from "stripe";
import { api, internal } from "./_generated/api";
import { Doc } from "./_generated/dataModel";

// export const get = action({
//     args: { gigId: v.id("gigs") },
//     handler: async (ctx, args) => {
//         const offers: Doc<"offers">[] = await ctx.runQuery(internal.offers.getOffers, { gigId: args.gigId });
//         const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//             apiVersion: "2023-10-16",
//         });
//         const offersWithPrices = offers.map(async (offer) => {
//             const price = await stripe.prices.retrieve(offer.stripePriceId);
//             return {
//                 ...offer,
//                 price: price.
//             }
//         });
//         return offersWithPrices;
//     },
// });


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


export const add = action({
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
        const offer = await ctx.runQuery(internal.offers.getOffer, { gigId: args.gigId, tier: args.tier });

        if (!offer) {
            const stripePrice = await ctx.runAction(internal.stripe.addPrice, {
                price: args.price,
                tier: args.tier,
                title: args.title,
            });

            await ctx.runMutation(internal.offers.insert, {
                gigId: args.gigId,
                title: args.title,
                description: args.description,
                tier: args.tier,
                price: args.price,
                delivery_days: args.delivery_days,
                revisions: args.revisions,
                stripePriceId: stripePrice.id,
            });

            return "success";
        }
        else {
            // const stripePrice = await ctx.runAction(internal.stripe.updatePrice, {
            //     price: args.price,
            //     tier: args.tier,
            //     title: args.title,
            //     stripePriceId: offer.stripePriceId,
            // });

            await ctx.runMutation(internal.offers.update, {
                gigId: args.gigId,
                title: args.title,
                description: args.description,
                price: args.price,
                delivery_days: args.delivery_days,
                revisions: args.revisions,
                offerId: offer._id,
            });
            return "success";
        }
    }
});



export const insert = internalMutation({
    args: {
        gigId: v.id("gigs"),
        title: v.string(),
        description: v.string(),
        tier: v.union(v.literal("Basic"), v.literal("Standard"), v.literal("Premium")),
        price: v.number(),
        delivery_days: v.number(),
        revisions: v.number(),
        stripePriceId: v.string(),
    },
    handler: async (ctx, args) => {
        const offerId = await ctx.db.insert("offers", {
            gigId: args.gigId,
            title: args.title,
            description: args.description,
            tier: args.tier,
            price: args.price,
            delivery_days: args.delivery_days,
            revisions: args.revisions,
            stripePriceId: args.stripePriceId,
        });
        return offerId;
    }



    // await ctx.db.patch(offer._id, {
    //     title: args.title,
    //     description: args.description,
    //     price: args.price,
    //     delivery_days: args.delivery_days,
    //     revisions: args.revisions,
    //     stripePriceId: price.id
    // });
});

export const update = internalMutation({
    args: {
        gigId: v.id("gigs"),
        title: v.string(),
        description: v.string(),
        price: v.number(),
        delivery_days: v.number(),
        revisions: v.number(),
        offerId: v.id("offers"),
    },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.offerId, {
            gigId: args.gigId,
            title: args.title,
            description: args.description,
            price: args.price,
            delivery_days: args.delivery_days,
            revisions: args.revisions,
        });
    },
});


export const getOffer = internalQuery({
    args: { gigId: v.id("gigs"), tier: v.union(v.literal("Basic"), v.literal("Standard"), v.literal("Premium")) },
    handler: async (ctx, args) => {
        const offer = await ctx.db.query("offers")
            .withIndex("by_gigId_tier", (q) =>
                q
                    .eq("gigId", args.gigId)
                    .eq("tier", args.tier)
            )
            .unique();
        return offer;
    },
});