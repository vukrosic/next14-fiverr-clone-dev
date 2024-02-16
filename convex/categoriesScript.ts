import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { defineTable } from "convex/server";

export const create = mutation({
    handler: async (ctx) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized");
        }

        // Check if categories and subcategories tables are empty
        const categoriesCount = await ctx.db.query("categories").collect();

        if (categoriesCount.length > 0) {
            return "Categories and subcategories already exist.";
        }

        const categories = [
            "Design & Arts",
            "Software Development & Tech",
            "Digital Marketing",
            "Consulting",
            "Video & Animation",
            "Writing",
            "Data",
            "Sound, Audio & Music",
            "Business & Management",
            "Artificial Intelligence"
        ];

        const subcategories = [
            ["Graphic Design", "Illustration", "Photography", "Fashion Design", "Fine Arts", "Interior Design", "Animation", "UI/UX Design", "Typography", "3D Modeling"],
            ["Web Development", "Mobile App Development", "Game Development", "Database Management", "DevOps", "Cloud Computing", "Cybersecurity", "AI & Machine Learning", "Blockchain Development", "IoT Development"],
            ["Social Media Marketing", "SEO", "Email Marketing", "Content Marketing", "PPC Advertising", "Influencer Marketing", "Online Branding", "Analytics & Data Insights", "E-commerce Marketing", "Video Marketing"],
            ["Business Strategy", "Financial Consulting", "Legal Consulting", "HR Consulting", "Marketing Consulting", "Management Consulting", "Startup Advisory", "Sales Consulting", "Operations Consulting", "Risk Management"],
            ["Motion Graphics", "Explainer Videos", "Animated Shorts", "Visual Effects", "Character Animation", "Stop Motion", "Whiteboard Animation", "Virtual Reality", "Augmented Reality", "CGI Animation"],
            ["Copywriting", "Editing & Proofreading", "Content Strategy", "Ghostwriting", "Technical Writing", "Translation", "Scriptwriting", "Blogging", "Creative Writing", "Academic Writing"],
            ["Data Analysis", "Data Visualization", "Statistical Analysis", "Predictive Modeling", "Big Data Management", "Data Mining", "Business Intelligence", "Quantitative Research", "Market Research", "Text Analysis"],
            ["Music Production", "Audio Editing", "Sound Design", "Voiceover", "Podcast Production", "Jingle Composition", "Foley & SFX", "Mixing & Mastering", "Live Sound Engineering", "Music Composition"],
            ["Leadership & Strategy", "Finance & Accounting", "Human Resources", "Marketing & Sales", "Operations & Logistics", "Entrepreneurship", "Project Management", "Business Development", "Risk Management", "Strategic Planning"],
            ["Natural Language Processing", "Computer Vision", "Speech Recognition", "Machine Learning", "Deep Learning", "Neural Networks", "Reinforcement Learning", "Natural Language Understanding", "Computer Graphics", "Expert Systems"]
        ];

        // Insert categories
        const categoryPromises = categories.map(async (category, index) => {
            const insertedCategory = await ctx.db.insert("categories", {
                name: category
            });

            // Insert subcategories
            const subcategoryPromises = subcategories[index].map(async (subcategory) => {
                await ctx.db.insert("subcategories", {
                    categoryId: insertedCategory,
                    name: subcategory
                });
            });

            await Promise.all(subcategoryPromises);
        });

        await Promise.all(categoryPromises);

        return "Categories and subcategories added successfully.";
    },
});