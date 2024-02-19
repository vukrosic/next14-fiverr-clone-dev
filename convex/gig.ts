import { v } from "convex/values";

import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export const create = mutation({
    args: {
        title: v.string(),
        description: v.string(),
        subcategoryId: v.string(),
        published: v.boolean(),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized");
        }

        const user = await ctx.db
            .query("users")
            .withIndex("by_token", (q) =>
                q.eq("tokenIdentifier", identity.tokenIdentifier)
            )
            .unique();

        const gig = await ctx.db.insert("gigs", {
            title: args.title,
            description: args.description,
            subcategoryId: args.subcategoryId as Id<"subcategories">,
            sellerId: user?._id!,
            published: args.published || false,
            clicks: 0,
        })

        return gig;
    },
});

export const remove = mutation({
    args: { id: v.id("gigs") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized");
        }

        const userId = identity.subject as Id<"users">;

        const existingFavorite = await ctx.db
            .query("userFavorites")
            .withIndex("by_user_gig", (q) =>
                q
                    .eq("userId", userId)
                    .eq("gigId", args.id)
            )
            .unique();

        if (existingFavorite) {
            await ctx.db.delete(existingFavorite._id);
        }

        await ctx.db.delete(args.id);
    },
});


export const update = mutation({
    args: { id: v.id("gigs"), title: v.string() },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized");
        }

        const title = args.title.trim();

        if (!title) {
            throw new Error("Title is required");
        }

        if (title.length > 60) {
            throw new Error("Title cannot be longer than 60 characters")
        }

        const gig = await ctx.db.patch(args.id, {
            title: args.title,
        });

        return gig;
    },
});


export const updateDescription = mutation({
    args: { id: v.id("gigs"), description: v.string() },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized");
        }

        const description = args.description.trim();

        if (!description) {
            throw new Error("Description is required");
        }

        if (description.length > 20000) {
            throw new Error("Description is too long!")
        }

        const gig = await ctx.db.patch(args.id, {
            description: args.description,
        });

        return gig;
    },
});

// export const updatePrice = mutation({
//     args: { id: v.id("gigs"), price: v.number() },
//     handler: async (ctx, args) => {
//         const identity = await ctx.auth.getUserIdentity();

//         if (!identity) {
//             throw new Error("Unauthorized");
//         }

//         const gig = await ctx.db.patch(args.id, {
//             price: args.price,
//         });

//         return gig;
//     },
// });


export const favorite = mutation({
    args: { id: v.id("gigs") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized");
        }

        const gig = await ctx.db.get(args.id);

        if (!gig) {
            throw new Error("Board not found");
        }

        const userId = identity.subject as Id<"users">;

        const existingFavorite = await ctx.db
            .query("userFavorites")
            .withIndex("by_user_gig", (q) =>
                q
                    .eq("userId", userId)
                    .eq("gigId", gig._id)
            )
            .unique();

        if (existingFavorite) {
            throw new Error("Board already favorited");
        }

        await ctx.db.insert("userFavorites", {
            userId,
            gigId: gig._id,
        });

        return gig;
    },
});


export const unfavorite = mutation({
    args: { id: v.id("gigs") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized");
        }

        const gig = await ctx.db.get(args.id);

        if (!gig) {
            throw new Error("Board not found");
        }

        const userId = identity.subject as Id<"users">;

        const existingFavorite = await ctx.db
            .query("userFavorites")
            .withIndex("by_user_gig", (q) =>
                q
                    .eq("userId", userId)
                    .eq("gigId", gig._id)
            )
            .unique();

        if (!existingFavorite) {
            throw new Error("Favorited gig not found");
        }

        await ctx.db.delete(existingFavorite._id);

        return gig;
    },
});

export const get = query({
    args: { id: v.id("gigs") },
    handler: async (ctx, args) => {
        const gig = ctx.db.get(args.id);

        return gig;
    },
});

export const getSeller = query({
    args: { id: v.id("users") },
    handler: async (ctx, args) => {
        const seller = ctx.db.get(args.id);
        return seller;
    },
});

export const getCategoryAndSubcategory = query({
    args: {
        gigId: v.id("gigs"),
    },
    handler: async (ctx, args) => {
        const gig = await ctx.db.get(args.gigId);

        if (!gig) {
            throw new Error("Gig not found");
        }

        const subcategory = await ctx.db.get(gig.subcategoryId);

        if (!subcategory) {
            throw new Error("Subcategory not found");
        }

        const category = await ctx.db.get(subcategory.categoryId);
        if (!category) {
            throw new Error("Category not found");
        }

        return {
            category: category.name,
            subcategory: subcategory.name,
        };
    }
});