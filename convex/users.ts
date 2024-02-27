import { v } from "convex/values";
import { action, internalMutation, internalQuery, mutation, query } from "./_generated/server";
import Stripe from "stripe";
import { internal } from "./_generated/api";

// export const store = action({
//     args: {},
//     handler: async (ctx) => {
//         const identity = await ctx.auth.getUserIdentity();
//         if (!identity) {
//             throw new Error("Called storeUser without authentication present");
//         }
//         console.log('STORING USER');
//         // Check if we've already stored this identity before.
//         const user = await ctx.runMutation()
//             .query("users")
//             .withIndex("by_token", (q) =>
//                 q.eq("tokenIdentifier", identity.tokenIdentifier)
//             )
//             .unique();

//         if (user !== null) {
//             // If we've seen this identity before but the name has changed, patch the value.
//             if (user.username !== identity.nickname) {
//                 await ctx.db.patch(user._id, { username: identity.name });
//             }
//             return user._id;
//         }


//         const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//             apiVersion: "2023-10-16",
//         });

//         const account = await stripe.accounts.create({
//             type: 'standard',
//             email: identity.email
//         });

//         // If it's a new identity, create a new `User`.
//         return await ctx.db.insert("users", {
//             fullName: identity.name!,
//             tokenIdentifier: identity.tokenIdentifier,
//             title: "",
//             about: "",
//             stripeAccountId: account.id,
//             username: identity.nickname!,
//             profileImageUrl: identity.profileUrl,
//         });
//     },
// });


export const store = mutation({
    args: {},
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Called storeUser without authentication present");
        }

        // Check if we've already stored this identity before.
        const user = await ctx.db
            .query("users")
            .withIndex("by_token", (q) =>
                q.eq("tokenIdentifier", identity.tokenIdentifier)
            )
            .unique();
        if (user !== null) {
            // If we've seen this identity before but the name has changed, patch the value.
            if (user.username !== identity.nickname) {
                await ctx.db.patch(user._id, { username: identity.name });
            }
            return user._id;
        }

        // If it's a new identity, create a new `User`.
        const userId = await ctx.db.insert("users", {
            fullName: identity.name!,
            tokenIdentifier: identity.tokenIdentifier,
            title: "",
            about: "",
            stripeAccountId: "account.id",
            username: identity.nickname!,
            profileImageUrl: identity.profileUrl,
        });

        return userId;
    },
});

export const createStripe = action({
    args: { userId: v.id("users") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        if (!identity) {
            throw new Error("Called storeUser without authentication present");
        }

        const stripe = new Stripe(process.env.NEXT_STRIPE_SECRET_KEY!, {
            apiVersion: "2023-10-16",
        });

        let accountId: string | null = await ctx.runQuery(internal.users.getStripeAccountId, { userId: args.userId });

        if (!accountId) {
            const account = await stripe.accounts.create({
                type: 'standard',
            });
            accountId = account.id;

            await ctx.runMutation(internal.users.setStripeAccountId, { userId: args.userId, stripeAccountId: accountId });
        }


        const accountLink = await stripe.accountLinks.create({
            account: accountId,
            refresh_url: 'http://localhost:3000/sign-up',
            return_url: `http://localhost:3000/stripe-account-setup-complete/${args.userId}`,
            type: 'account_onboarding',
        });

        return accountLink.url;
    },
});

export const getStripeAccountId = internalQuery({
    args: { userId: v.id("users") },
    handler: async (ctx, args) => {
        const user = await ctx.db.get(args.userId);
        if (!user) {
            throw new Error("User not found");
        }
        console.log(user);
        return user.stripeAccountId;
    },
});

export const setStripeAccountId = internalMutation({
    args: { userId: v.id("users"), stripeAccountId: v.string() },
    handler: async (ctx, args) => {
        const user = await ctx.db.get(args.userId);
        if (!user) {
            throw new Error("User not found");
        }
        await ctx.db.patch(args.userId, { stripeAccountId: args.stripeAccountId });
    },
});



export const get = query({
    args: { id: v.id("users") },
    handler: async (ctx, args) => {
        const user = await ctx.db.get(args.id);
        return user;
    },
});

export const getUserById = internalQuery({
    args: { id: v.id("users") },
    handler: async (ctx, args) => {
        const user = await ctx.db.get(args.id);
        return user;
    },
});

export const getUserByUsername = query({
    args: { username: v.string() },
    handler: async (ctx, args) => {
        const user = await ctx.db
            .query("users")
            .withIndex("by_username", (q) => q.eq("username", args.username))
            .unique();

        return user;
    },
});

export const updateStripeSetup = internalMutation({
    args: { id: v.id("users"), stripeAccountSetupComplete: v.boolean() },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.id, { stripeAccountSetupComplete: args.stripeAccountSetupComplete });
    },
});

// export const get = query({
//     args: { body: v.string() },
//     handler: async (ctx, args) => {
//         const identity = await ctx.auth.getUserIdentity();
//         if (!identity) {
//             throw new Error("Unauthenticated call to mutation");
//         }
//         // Note: If you don't want to define an index right away, you can use
//         // ctx.db.query("users")
//         //  .filter(q => q.eq(q.field("tokenIdentifier"), identity.tokenIdentifier))
//         //  .unique();
//         const user = await ctx.db
//             .query("users")
//             .withIndex("by_token", (q) =>
//                 q.eq("tokenIdentifier", identity.tokenIdentifier)
//             )
//             .unique();
//         if (!user) {
//             throw new Error("Unauthenticated call to mutation");
//         }
//         // do something with `user`...
//         return user;
//     }
// });

export const getCurrentUser = query({
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            return null;
        }

        // throw new Error("Unauthenticated call to query");
        const user = await ctx.db
            .query("users")
            .withIndex("by_token", (q) =>
                q.eq("tokenIdentifier", identity.tokenIdentifier)
            )
            .unique();

        return user;
    }
});


export const generateUploadUrl = mutation(async (ctx) => {
    return await ctx.storage.generateUploadUrl();
});

export const getLanguagesByUsername = query({
    args: { username: v.string() },
    handler: async (ctx, args) => {
        const user = await ctx.db
            .query("users")
            .withIndex("by_username", (q) => q.eq("username", args.username))
            .unique();

        if (!user) {
            throw new Error("User not found");
        }

        const languages = await ctx.db
            .query("languages")
            .withIndex("by_userId", (q) => q.eq("userId", user._id))
            .collect();

        return languages;
    },
});

export const getCountryByUsername = query({
    args: { username: v.string() },
    handler: async (ctx, args) => {
        const user = await ctx.db
            .query("users")
            .withIndex("by_username", (q) => q.eq("username", args.username))
            .unique();

        if (!user) {
            throw new Error("User not found");
        }

        const country = await ctx.db.query("countries")
            .withIndex("by_userId", (q) => q.eq("userId", user._id))
            .unique();

        if (!country) {
            throw new Error("Country not found");
        }
        return country;
    },
});