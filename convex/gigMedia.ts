import { v } from "convex/values";
import { mutation } from "./_generated/server";


export const sendImage = mutation({
    args: { id: v.id("gigMedia"), storageId: v.id("_storage"), format: v.string(), gigId: v.id("gigs") },
    handler: async (ctx, args) => {
        const { id } = args;

        await ctx.db.patch(id, {
            storageId: args.storageId,
            format: args.format,
            gigId: args.gigId
        });
    },
});