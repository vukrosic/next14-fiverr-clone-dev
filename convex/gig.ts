import { v } from "convex/values";

import { mutation, query } from "./_generated/server";

export const create = mutation({
    args: {
        title: v.string(),
        description: v.string(),
        price: v.number(),
        category: v.string(),
        ownerId: v.string(),
        ownerName: v.string(),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized");
        }

        const gig = await ctx.db.insert("gigs", {
            title: args.title,
            description: args.description,
            price: args.price,
            ownerId: identity.subject,
            ownerName: identity.name!,
            // category: args.category,
        });

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

        const userId = identity.subject;

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


export const generateUploadUrl = mutation(async (ctx) => {
    return await ctx.storage.generateUploadUrl();
});


export const sendImage = mutation({
    args: { id: v.id("gigs"), storageId: v.id("_storage"), author: v.string() },
    handler: async (ctx, args) => {
        const { id } = args;
        console.log("id", id);
        await ctx.db.patch(id, {
            storageId: args.storageId,
            format: "image",
        });
    },
});

export const getImageUrl = query({
    args: { storageId: v.optional(v.id("_storage")) },
    handler: async (ctx, args) => {
        if (!args.storageId) return null;
        return await ctx.storage.getUrl(args.storageId);
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

        if (description.length > 500) {
            throw new Error("Description cannot be longer than 500 characters")
        }

        const gig = await ctx.db.patch(args.id, {
            description: args.description,
        });

        return gig;
    },
});

export const updatePrice = mutation({
    args: { id: v.id("gigs"), price: v.number() },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized");
        }

        const gig = await ctx.db.patch(args.id, {
            price: args.price,
        });

        return gig;
    },
});


export const favorite = mutation({
    args: { id: v.id("gigs"), category: v.string() },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized");
        }

        const gig = await ctx.db.get(args.id);

        if (!gig) {
            throw new Error("Board not found");
        }

        const userId = identity.subject;

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
            category: args.category,
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

        const userId = identity.subject;

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