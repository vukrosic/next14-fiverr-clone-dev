"use node";

import { v } from "convex/values";
import { action, httpAction, internalAction } from "./_generated/server";
import Stripe from "stripe";
import { internal } from "./_generated/api";
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
    args: { text: v.string() },
    handler: async ({ runMutation }, { text }) => {
        const stripe = new Stripe(process.env.NEXT_STRIPE_SECRET_KEY!, {
            apiVersion: "2023-10-16",
        });

        const session = await stripe.checkout.sessions.create(
            {
                mode: 'payment',
                line_items: [
                    {
                        price: '{{PRICE_ID}}',
                        quantity: 1,
                    },
                ],
                payment_intent_data: {
                    application_fee_amount: 123,
                },
                success_url: 'https://example.com/success',
                cancel_url: 'https://example.com/cancel',
            },
            {
                stripeAccount: '{{CONNECTED_ACCOUNT_ID}}',
            }
        );


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
    },
});


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