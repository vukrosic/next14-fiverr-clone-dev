import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Id } from "./_generated/dataModel";
import { api } from "./_generated/api";
import { getCurrentUser } from "./users";

export const create = mutation({
    args: { participantOneId: v.id("users"), participantTwoId: v.id("users") },
    handler: async (ctx, args) => {
        const conversation = await ctx.db.insert("conversations", {
            participantOneId: args.participantOneId,
            participantTwoId: args.participantTwoId,
        });
        return conversation;
    }
})

export const get = query({
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized");
        }

        const conversations = await ctx.db
            .query("conversations")
            .collect();

        return conversations;
    }
});