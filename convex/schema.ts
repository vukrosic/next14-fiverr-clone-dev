import { v } from "convex/values";
import { defineSchema, defineTable } from "convex/server";

export default defineSchema({
    users: defineTable({
        displayName: v.string(),
        username: v.string(),
        title: v.string(),
        about: v.string(),
        portfolioUrls: v.array(v.string()),
        favoritedSellerIds: v.array(v.string()),

    }),
    reviews: defineTable({
        authorId: v.id("users"),
        sellerId: v.id("users"),
        comment: v.string(),
        communication_level: v.number(),
        recommend_to_a_friend: v.number(),
        service_as_described: v.number(),
        orderId: v.string(),
    }),
    skills: defineTable({
        skill: v.string(),
        userId: v.id("users"),
    }),
    languages: defineTable({
        language: v.string(),
        userId: v.id("users"),
    }),
    userFlags: defineTable({
        userId: v.id("users"),
        markingType: v.string(),
        description: v.string(),
    }),
    countries: defineTable({
        country: v.string(),
        userId: v.id("users"),
    }),
    gigs: defineTable({
        title: v.string(),
        description: v.string(),
        sellerId: v.id("users"),
        subcategoryId: v.id("subcategories"),
        published: v.boolean(),
        clicks: v.number(),
    })
        .searchIndex("search_title", {
            searchField: "title",
        }),
    offers: defineTable({
        gigId: v.id("gigs"),
        title: v.string(),
        description: v.string(),
        price: v.number(),
        delivery_time: v.string(),
        revisions: v.number(),
    }),
    orders: defineTable({
        offerId: v.id("offers"),
        userId: v.id("users"),
    }),
    gigMedia: defineTable({
        storageId: v.id("_storage"),
        format: v.string(),
        gigId: v.id("gigs"),
    }),
    categories: defineTable({
        name: v.string(),
    }),
    subcategories: defineTable({
        categoryId: v.id("categories"),
        name: v.string(),
    }),
    searchTags: defineTable({
        gigIds: v.array(v.string()),
    }),
    faq: defineTable({
        question: v.string(),
        answer: v.string(),
        gigId: v.id("gigs"),
    }),
    messages: defineTable({
        userId: v.id("users"),
        text: v.string(),
        imageUrl: v.string(),
        seenIds: v.string(),
    }),
    conversation: defineTable({
        userId: v.id("users"),
        messageId: v.id("messages"),
        lastMessageTimestamp: v.int64(),
    }),
    userFavorites: defineTable({
        userId: v.id("users"),
        gigId: v.id("gigs"),
    })
        .index("by_gig", ["gigId"])
        .index("by_user_gig", ["userId", "gigId"])
        .index("by_user", ["userId"]),
    gigOffers: defineTable({
        gigId: v.id("gigs"),
        offerId: v.id("offers"),
    }),
    orderReviews: defineTable({
        orderId: v.id("orders"),
        reviewId: v.id("reviews"),
    }),
    gigSearchTags: defineTable({
        gigId: v.id("gigs"),
        searchTagId: v.id("searchTags"),
    }),
    // payments: defineTable({
    //     text: v.string(),
    //     stripeId: v.optional(v.string()),
    //     messageId: v.optional(v.id("messages")),
    // })
    //     .index("stripeId", ["stripeId"]),
});



// export default defineSchema({
//     gigs: defineTable({
//         title: v.string(),
//         description: v.string(),
//         price: v.number(),
//         ownerId: v.string(),
//         ownerName: v.string(),
//         storageId: v.optional(v.string()),
//         format: v.optional(v.string()),
//     })
//         .searchIndex("search_title", {
//             searchField: "title",
//         }),
//     userFavorites: defineTable({
//         userId: v.string(),
//         gigId: v.id("gigs")
//     })
//         .index("by_gig", ["gigId"])
//         .index("by_user_gig", ["userId", "gigId"])
//         .index("by_user", ["userId"]),
//     payments: defineTable({
//         text: v.string(),
//         stripeId: v.optional(v.string()),
//         messageId: v.optional(v.id("messages")),
//     })
//         .index("stripeId", ["stripeId"]),
//     messages: defineTable({
//         text: v.string(),
//     }),
// });