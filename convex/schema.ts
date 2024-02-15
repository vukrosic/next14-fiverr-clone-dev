import { v } from "convex/values";
import { defineSchema, defineTable } from "convex/server";

export default defineSchema({
    gigs: defineTable({
        title: v.string(),
        description: v.string(),
        price: v.number(),
        ownerId: v.string(),
        ownerName: v.string(),
        storageId: v.optional(v.string()),
        format: v.optional(v.string()),
    })
        .searchIndex("search_title", {
            searchField: "title",
        }),
    userFavorites: defineTable({
        userId: v.string(),
        gigId: v.id("gigs")
    })
        .index("by_gig", ["gigId"])
        .index("by_user_gig", ["userId", "gigId"])
        .index("by_user", ["userId"]),
    payments: defineTable({
        text: v.string(),
        stripeId: v.optional(v.string()),
        messageId: v.optional(v.id("messages")),
    })
        .index("stripeId", ["stripeId"]),
    messages: defineTable({
        text: v.string(),
    }),
});