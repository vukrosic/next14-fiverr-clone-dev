import { query } from "./_generated/server";

export const get = query({
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized");
        }

        const gigs = await ctx.db.query("gigs")
            .order("desc")
            .collect();

        return gigs;
    },
})