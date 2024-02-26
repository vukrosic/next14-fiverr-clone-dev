import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const add = mutation({
    args: { userId: v.id("users"), language: v.string() },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized");
        }

        await ctx.db.insert("languages", {
            userId: args.userId,
            language: args.language,
        });
    },
});

export const get = query({
    args: { userId: v.id("users") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized");
        }

        const languages = await ctx.db
            .query("languages")
            .withIndex("by_userId", (q) => q.eq("userId", args.userId))
            .collect();

        return languages;
    },
});