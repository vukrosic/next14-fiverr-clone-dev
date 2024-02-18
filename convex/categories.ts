import { v } from "convex/values";
import { query } from "./_generated/server";
import { Id } from "./_generated/dataModel";

export const get = query({
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized");
        }
        const categories = await ctx.db.query("categories").collect();

        // return ctx.db
        //         .query("userFavorites")
        //         .withIndex("by_user_gig", (q) =>
        //             q
        //                 .eq("userId", identity.subject as Id<"users">)
        //                 .eq("gigId", gig._id)
        //         )
        //         .unique()
        //         .then((favorite) => {
        //             return {
        //                 ...gig,
        //                 favorited: !!favorite,
        //             };
        //         });


        const categoriesWithSubcategoriesRelations = categories.map((category) => {
            return ctx.db
                .query("subcategories")
                .withIndex("by_category", (q) =>
                    q
                        .eq("categoryId", category._id)
                )
                .collect()
                .then((subcategories) => {
                    return {
                        ...category,
                        subcategories: subcategories,
                    };
                });
        });

        const categoriesWithSubcategories = await Promise.all(categoriesWithSubcategoriesRelations);
        console.log(categoriesWithSubcategoriesRelations);
        return categoriesWithSubcategories;
    }
});