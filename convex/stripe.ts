import { v } from "convex/values";
import { action, httpAction, internalAction, internalMutation, internalQuery, mutation } from "./_generated/server";
import Stripe from "stripe";
import { api, internal } from "./_generated/api";
import { httpRouter } from "convex/server";

export const onboard = action({
    args: { code: v.string(), stripeAccountId: v.string() },
    handler: async ({ runMutation }, { code, stripeAccountId }) => {
        const stripe = new Stripe(process.env.NEXT_STRIPE_SECRET_KEY!, {
            apiVersion: "2023-10-16",
        });

        const accountLink = await stripe.accountLinks.create({
            account: stripeAccountId,
            refresh_url: 'http://localhost.3000/stripe-connect-refresh', // generate new link, this is triggered if expried or used
            return_url: 'http://localhost.3000/',
            type: 'account_onboarding',
        });

        return accountLink.url;
    },
});



export const pay = action({
    args: { priceId: v.string(), title: v.string(), stripeAccountId: v.string() },
    handler: async (ctx, args) => {

        const stripe = new Stripe(process.env.NEXT_STRIPE_SECRET_KEY!, {
            apiVersion: "2023-10-16",
        });
        const domain = process.env.NEXT_PUBLIC_HOSTING_URL;

        const price = await stripe.prices.retrieve(args.priceId);

        if (price.unit_amount === null) {
            throw new Error("Error: Stripe price doesn't have unit_amount.");
        }

        const session = await stripe.checkout.sessions.create(
            {
                mode: 'payment',
                // line_items: [
                //     {
                //         price: args.priceId,
                //         quantity: 1,
                //     },
                // ],
                line_items: [
                    {
                        price_data: {
                            currency: "usd",
                            product_data: {
                                name: args.title,
                            },
                            unit_amount: price.unit_amount,
                        },
                        quantity: 1,
                    },
                ],
                payment_intent_data: {
                    application_fee_amount: price.unit_amount * 0.1,
                },
                success_url: `${domain}`,
                cancel_url: `${domain}`,
            },
            {
                stripeAccount: args.stripeAccountId,
            }
        );

        return session.url;
    },
});


export const addPrice = internalAction({
    args: {
        tier: v.union(v.literal("Basic"), v.literal("Standard"), v.literal("Premium")),
        price: v.number(),
        title: v.string(),
    },
    handler: async (ctx, args) => {
        const stripe = new Stripe(process.env.NEXT_STRIPE_SECRET_KEY!, {
            apiVersion: "2023-10-16",
        });

        const price = await stripe.prices.create({
            currency: 'usd',
            unit_amount: args.price * 100,
            product_data: {
                name: "[" + args.tier + "] " + args.title,
            },
        });

        return price;
    },
});


export const createPaymentIntent = action({
    args: { id: v.number(), price: v.number(), qty: v.number(), storeId: v.number(), stripeAccountId: v.string() },
    handler: async (ctx, args) => {
        const stripe = new Stripe(process.env.NEXT_STRIPE_SECRET_KEY!, {
            apiVersion: "2023-10-16",
        });

        const paymentIntent = await stripe.paymentIntents.create({
            amount: args.price * 100,
            currency: 'usd',
            automatic_payment_methods: {
                enabled: true,
            },
            application_fee_amount: args.price * 0.05,
        },
            {
                stripeAccount: args.stripeAccountId,
            });

        return paymentIntent;
    },
});


export const setStripeAccountSetupComplete = action({
    args: { userId: v.id("users") },
    handler: async (ctx, args) => {
        const stripe = new Stripe(process.env.NEXT_STRIPE_SECRET_KEY!, {
            apiVersion: "2023-10-16",
        });

        const user = await ctx.runQuery(api.users.get, { id: args.userId });
        if (!user) {
            throw new Error("User not found");
        }

        if (!user.stripeAccountId) {
            throw new Error("Stripe account not found");
        }

        const account = await stripe.accounts.retrieve(user.stripeAccountId);

        if (account.charges_enabled) {
            await ctx.runMutation(internal.users.updateStripeSetup, { id: args.userId, stripeAccountSetupComplete: true });
        }
        else {
            throw new Error("Stripe account not setup");
        }
    },
});



// await runMutation(internal.payments.markPending, {
//     paymentId,
//     stripeId: user_stripe_session.id,
// });
// return user_stripe_session.url;


// const domain = process.env.NEXT_PUBLIC_HOSTING_URL;
// const stripe = new Stripe(process.env.NEXT_STRIPE_PUBLIC_KEY!, {
//     apiVersion: "2023-10-16",
// });
// const paymentId = await runMutation(internal.payments.create, { text });
// const user_stripe_session = await stripe.checkout.sessions.create({
//     line_items: [
//         {
//             price_data: {
//                 currency: "USD",
//                 unit_amount: 100,
//                 tax_behavior: "exclusive",
//                 product_data: {
//                     name: "One message of your choosing",
//                 },
//             },
//             quantity: 1,
//         },
//     ],
//     mode: "payment",
//     success_url: `${domain}?paymentId=${paymentId}`,
//     cancel_url: `${domain}`,
//     automatic_tax: { enabled: true },
// });

// await runMutation(internal.payments.markPending, {
//     paymentId,
//     stripeId: user_stripe_session.id,
// });
// return user_stripe_session.url;







// const getOffers = internalQuery({
//     args: { gigId: v.id("gigs") },
//     handler: async (ctx, args) => {
//         const offers = await ctx.db.query("offers")
//         .withIndex("by_gigId_tier", (q) =>
//             q
//                 .eq("gigId", args.gigId)
//         ).all();
//         return offers;
//     },
// });



// export const pay = action({
//     args: { text: v.string() },
//     handler: async ({ runMutation }, { text }) => {
//         const domain = process.env.NEXT_PUBLIC_HOSTING_URL;
//         const stripe = new Stripe(process.env.NEXT_STRIPE_PUBLIC_KEY!, {
//             apiVersion: "2023-10-16",
//         });
//         const paymentId = await runMutation(internal.payments.create, { text });
//         const user_stripe_session = await stripe.checkout.sessions.create({
//             line_items: [
//                 {
//                     price_data: {
//                         currency: "USD",
//                         unit_amount: 100,
//                         tax_behavior: "exclusive",
//                         product_data: {
//                             name: "One message of your choosing",
//                         },
//                     },
//                     quantity: 1,
//                 },
//             ],
//             mode: "payment",
//             success_url: `${domain}?paymentId=${paymentId}`,
//             cancel_url: `${domain}`,
//             automatic_tax: { enabled: true },
//         });

//         await runMutation(internal.payments.markPending, {
//             paymentId,
//             stripeId: user_stripe_session.id,
//         });
//         return user_stripe_session.url;
//     },
// });


// export const fulfill = internalAction({
//     args: { signature: v.string(), payload: v.string() },
//     handler: async ({ runMutation }, { signature, payload }) => {
//         const stripe = new Stripe(process.env.NEXT_STRIPE_PUBLIC_KEY!, {
//             apiVersion: "2023-10-16",
//         });

//         const webhookSecret = process.env.STRIPE_WEBHOOKS_SECRET as string;
//         try {
//             const event = stripe.webhooks.constructEvent(
//                 payload,
//                 signature,
//                 webhookSecret
//             );
//             if (event.type === "checkout.session.completed") {
//                 const stripeId = (event.data.object as { id: string }).id;
//                 await runMutation(internal.payments.fulfill, { stripeId });
//             }
//             return { success: true };
//         } catch (err) {
//             console.error(err);
//             return { success: false, error: (err as { message: string }).message };
//         }
//     },
// });

