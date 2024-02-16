"use strict";
exports.__esModule = true;
var values_1 = require("convex/values");
var server_1 = require("convex/server");
exports["default"] = (0, server_1.defineSchema)({
    users: (0, server_1.defineTable)({
        displayName: values_1.v.string(),
        username: values_1.v.string(),
        createdAt: values_1.v.number(),
        title: values_1.v.string(),
        about: values_1.v.string(),
        portfolioUrls: values_1.v.array(values_1.v.string()),
        favoritedSellerIds: values_1.v.array(values_1.v.string())
    }),
    reviews: (0, server_1.defineTable)({
        createdAt: values_1.v.int64(),
        authorId: values_1.v.id("users"),
        sellerId: values_1.v.id("users"),
        comment: values_1.v.string(),
        communication_level: values_1.v.number(),
        recommend_to_a_friend: values_1.v.number(),
        service_as_described: values_1.v.number(),
        orderId: values_1.v.string()
    }),
    skills: (0, server_1.defineTable)({
        skill: values_1.v.string(),
        userId: values_1.v.id("users")
    }),
    languages: (0, server_1.defineTable)({
        language: values_1.v.string(),
        userId: values_1.v.id("users")
    }),
    userFlags: (0, server_1.defineTable)({
        userId: values_1.v.id("users"),
        markingType: values_1.v.string(),
        description: values_1.v.string()
    }),
    countries: (0, server_1.defineTable)({
        country: values_1.v.string(),
        userId: values_1.v.id("users")
    }),
    gigs: (0, server_1.defineTable)({
        title: values_1.v.string(),
        description: values_1.v.string(),
        sellerId: values_1.v.id("users"),
        subcategoryId: values_1.v.id("subcategories"),
        published: values_1.v.boolean(),
        clicks: values_1.v.number()
    })
        .searchIndex("search_title", {
        searchField: "title"
    }),
    offers: (0, server_1.defineTable)({
        gigId: values_1.v.id("gigs"),
        title: values_1.v.string(),
        description: values_1.v.string(),
        price: values_1.v.number(),
        delivery_time: values_1.v.string(),
        revisions: values_1.v.number()
    }),
    orders: (0, server_1.defineTable)({
        offerId: values_1.v.id("offers"),
        userId: values_1.v.id("users")
    }),
    gigMedia: (0, server_1.defineTable)({
        storageId: values_1.v.id("_storage"),
        format: values_1.v.string(),
        gigId: values_1.v.id("gigs")
    }),
    categories: (0, server_1.defineTable)({
        name: values_1.v.string()
    }),
    subcategories: (0, server_1.defineTable)({
        categoryId: values_1.v.id("categories"),
        name: values_1.v.string()
    }),
    searchTags: (0, server_1.defineTable)({
        gigIds: values_1.v.array(values_1.v.string())
    }),
    faq: (0, server_1.defineTable)({
        question: values_1.v.string(),
        answer: values_1.v.string(),
        gigId: values_1.v.id("gigs")
    }),
    messages: (0, server_1.defineTable)({
        userId: values_1.v.id("users"),
        createdAt: values_1.v.int64(),
        text: values_1.v.string(),
        imageUrl: values_1.v.string(),
        seenIds: values_1.v.string()
    }),
    conversation: (0, server_1.defineTable)({
        userId: values_1.v.id("users"),
        messageId: values_1.v.id("messages"),
        lastMessageTimestamp: values_1.v.int64()
    }),
    userFavorites: (0, server_1.defineTable)({
        userId: values_1.v.id("users"),
        gigId: values_1.v.id("gigs")
    })
        .index("by_gig", ["gigId"])
        .index("by_user_gig", ["userId", "gigId"])
        .index("by_user", ["userId"]),
    gigOffers: (0, server_1.defineTable)({
        gigId: values_1.v.id("gigs"),
        offerId: values_1.v.id("offers")
    }),
    orderReviews: (0, server_1.defineTable)({
        orderId: values_1.v.id("orders"),
        reviewId: values_1.v.id("reviews")
    }),
    gigSearchTags: (0, server_1.defineTable)({
        gigId: values_1.v.id("gigs"),
        searchTagId: values_1.v.id("searchTags")
    })
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
