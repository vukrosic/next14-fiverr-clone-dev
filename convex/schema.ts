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
        imageUrl: v.optional(v.string()),
        // category: v.string(),
    })
        // .index("by_category", ["category"])
        .searchIndex("search_title", {
            searchField: "title",
            // filterFields: ["category"],
        }),
    userFavorites: defineTable({
        category: v.string(),
        userId: v.string(),
        gigId: v.id("gigs")
    })
        .index("by_gig", ["gigId"])
        // .index("category", ["userId", "category"])
        .index("by_user_gig", ["userId", "gigId"])
    // .index("by_user_gig_category", ["userId", "gigId", "category"])
});