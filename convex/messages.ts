import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// export const list = query({
//   args: {},
//   handler: async (ctx) => {
//     const messages = await ctx.db.query("messages").collect();
//     return Promise.all(
//       messages.map(async (message) => ({
//         ...message,
//         // If the message is an "image" its `body` is an `Id<"_storage">`
//         ...(message.format === "image"
//           ? { url: await ctx.storage.getUrl(message.body) }
//           : {}),
//       }))
//     );
//   },
// });

// import { mutation } from "./_generated/server";

// export const generateUploadUrl = mutation(async (ctx) => {
//   return await ctx.storage.generateUploadUrl();
// });

// export const sendImage = mutation({
//   args: { storageId: v.id("_storage"), author: v.string() },
//   handler: async (ctx, args) => {
//     await ctx.db.insert("messages", {
//       body: args.storageId,
//       author: args.author,
//       format: "image",
//     });
//   },
// });

export const send = mutation({
    args: { text: v.optional(v.string()), userId: v.id("users"), imageUrl: v.optional(v.string()), seen: v.boolean(), conversationId: v.id("conversations") },
    handler: async (ctx, args) => {
        const { text, userId, imageUrl, seen, conversationId } = args;
        await ctx.db.insert("messages", {
            text,
            userId,
            imageUrl,
            seen,
            conversationId,
        });
    },
});

export const get = query({
    handler: async (ctx) => {
        return await ctx.db
            .query("messages")
            // .withIndex("by_conversationId", (q) => q.eq("conversationId", args.conversationId))
            .collect();
    },
});

export const getLast = query({
    args: { conversationId: v.id("conversations") },
    handler: async (ctx, args) => {
        const message = await ctx.db
            .query("messages")
            .withIndex("by_conversationId", (q) => q.eq("conversationId", args.conversationId))
            .first();
        return message;
    },
});