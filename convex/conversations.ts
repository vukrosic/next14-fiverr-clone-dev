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

const createConversation = async (ctx: any, currentUser: any, otherUser: any) => {
    // Create conversation
    const newConversation = await ctx.db.insert("conversations", {
        participantOneId: currentUser._id,
        participantTwoId: otherUser._id,
    });
    return newConversation;
};

export const getByUser = query({
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized");
        }

        // current user
        const currentUser = await ctx.db
            .query("users")
            .withIndex("by_token", (q) =>
                q.eq("tokenIdentifier", identity.tokenIdentifier)
            )
            .unique();
        if (!currentUser) {
            throw new Error("Couldn't authenticate user");
        }

        const conversations = await ctx.db
            .query("conversations")
            .filter((q) =>
                q.or(
                    q.eq(q.field("participantOneId"), currentUser._id),
                    q.eq(q.field("participantTwoId"), currentUser._id)
                )
            )
            .collect();
        return conversations;
    }
});

export const getConversation = query({
    args: { username: v.string() },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized");
        }

        // current user
        const currentUser = await ctx.db
            .query("users")
            .withIndex("by_token", (q) =>
                q.eq("tokenIdentifier", identity.tokenIdentifier)
            )
            .unique();
        if (!currentUser) {
            throw new Error("Couldn't authenticate user");
        }

        // other user
        const otherUser = await ctx.db
            .query("users")
            .withIndex("by_username", (q) => q.eq("username", args.username))
            .unique();

        const conversation = await ctx.db
            .query("conversations")
            .filter((q) =>
                q.or(
                    q.and(
                        q.eq(q.field("participantOneId"), currentUser._id),
                        q.eq(q.field("participantTwoId"), otherUser?._id)
                    ),
                    q.and(
                        q.eq(q.field("participantOneId"), otherUser?._id),
                        q.eq(q.field("participantTwoId"), currentUser._id)
                    )
                )
            )
            .unique();
        // if (conversation === null) {
        //     return {
        //         currentUser,
        //         otherUser,
        //         conversation,
        //         messages: null
        //     };
        // }

        const messages = await ctx.db
            .query("messages")
            .filter((q) => q.eq(q.field("conversationId"), conversation?._id))
            .collect();

        const messagesWithUsersRelation = messages.map(async (message: any) => {
            const user = await ctx.db.query("users")
                .filter((q: any) => q.eq(q.field("_id"), message.userId))
                .unique();
            return {
                ...message,
                user
            }
        });

        const messagesWithUsers = await Promise.all(messagesWithUsersRelation);

        return {
            currentUser,
            otherUser,
            conversation,
            messagesWithUsers
        };
    }
});