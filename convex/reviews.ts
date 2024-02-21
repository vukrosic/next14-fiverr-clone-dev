import { v } from "convex/values";
import { query } from "./_generated/server";
import { ExpressionOrValue } from "convex/server";

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

        // if (!reviews) {
        //     throw new Error("Reviews not found");
        // }

        // for each review, get the order
        const reviewsFullType = await Promise.all(reviews.map(async (review) => {

            const gig = await ctx.db.query("gigs")
                .filter((q) => q.eq(q.field("_id"), review.gigId))
                .unique();

            if (!gig) {
                throw new Error("Gig not found");
            }

            // get author country
            const author = await ctx.db.query("users")
                .filter((q) => q.eq(q.field("_id"), review.authorId))
                .unique();

            if (!author) {
                throw new Error("Author not found");
            }

            const country = await ctx.db.query("countries")
                .withIndex("by_userId", (q) => q.eq("userId", seller._id))
                .unique();

            if (!country) {
                throw new Error("Country not found");
            }

            return {
                ...review,
                gig,
                author: {
                    ...author,
                    country,
                },
            }
        }));

        return reviewsFullType;
    },
});