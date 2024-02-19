import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const generateUploadUrl = mutation(async (ctx) => {
    return await ctx.storage.generateUploadUrl();
});

export const sendImage = mutation({
    args: { storageId: v.id("_storage"), format: v.string(), gigId: v.id("gigs") },
    handler: async (ctx, args) => {
        // check how many images are already uploaded
        const gigMedia = await ctx.db
            .query("gigMedia")
            .withIndex("by_gigId", (q) => q.eq("gigId", args.gigId))
            .collect();

        if (gigMedia.length <= 1) {
            throw new Error("You can upload up to 1 media files. Please delete a media file before uploading a new one.");
        }

        await ctx.db.insert("gigMedia", {
            storageId: args.storageId,
            format: args.format,
            gigId: args.gigId
        });
    },
});

export const getGigMedia = query({
    args: { gigId: v.id("gigs") },
    handler: async (ctx, args) => {
        const gigMedia = await ctx.db
            .query("gigMedia")
            .withIndex("by_gigId", (q) => q.eq("gigId", args.gigId))
            .collect();
        return gigMedia;
    },
});

export const getMediaUrl = query({
    args: { storageId: v.optional(v.id("_storage")) },
    handler: async (ctx, args) => {
        if (!args.storageId) return null;
        return await ctx.storage.getUrl(args.storageId);
    },
});