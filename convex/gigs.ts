import { v } from "convex/values";
import { query } from "./_generated/server";
import { getAllOrThrow } from "convex-helpers/server/relationships";
import { Id } from "./_generated/dataModel";

export const get = query({
    args: {
        search: v.optional(v.string()),
        favorites: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized");
        }

        if (args.favorites) {
            const favorites = await ctx.db
                .query("userFavorites")
                .withIndex("by_user", (q) => q.eq("userId", identity.subject as Id<"users">))
                .order("desc")
                .collect();

            const favGigIds = favorites.map((fav) => fav.gigId);

            const gigs = await getAllOrThrow(ctx.db, favGigIds)

            return gigs.map((gig) => ({
                ...gig,
                favorited: true,
            }));
        }

        const title = args.search as string;

        let gigs = [];

        if (title) {
            gigs = await ctx.db
                .query("gigs")
                .withSearchIndex("search_title", (q) =>
                    q
                        .search("title", title)
                )
                .collect();
        } else {
            gigs = await ctx.db
                .query("gigs")
                .order("desc")
                .collect();
        }

        const gigsWithFavoriteRelation = gigs.map((gig) => {
            return ctx.db
                .query("userFavorites")
                .withIndex("by_user_gig", (q) =>
                    q
                        .eq("userId", identity.subject as Id<"users">)
                        .eq("gigId", gig._id)
                )
                .unique()
                .then((favorite) => {
                    return {
                        ...gig,
                        favorited: !!favorite,
                    };
                });
        });

        const gigsWithFavorite = await Promise.all(gigsWithFavoriteRelation);

        return gigsWithFavorite;
    },
});