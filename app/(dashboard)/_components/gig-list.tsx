"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { EmptySearch } from "./empty-search";
import { EmptyFavorites } from "./empty-favorites";
import { GigCard } from "./gig-card";

interface GigListProps {
    query: {
        search?: string;
        favorites?: string;
    };
};

export const GigList = ({
    query,
}: GigListProps) => {
    const data = useQuery(api.gigs.get);

    if (data === undefined) {
        return (
            <div>
                Loading...
            </div>
        )
    }

    if (!data?.length && query.search) {
        return (
            <EmptySearch />
        )
    }

    if (!data?.length && query.favorites) {
        return (
            <EmptyFavorites />
        )
    }

    return (
        <div>
            <h2 className="text-3xl">
                {query.favorites ? "Favorite gigs" : "All gigs"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
                {data?.map((gig) => (
                    <GigCard
                        key={gig._id}
                        id={gig._id}
                        title={gig.title}
                        description={gig.description}
                        price={gig.price}
                        imageUrl={gig.imageUrl || 'https://t3.ftcdn.net/jpg/02/48/42/64/360_F_248426448_NVKLywWqArG2ADUxDq6QprtIzsF82dMF.jpg'}
                        // category={gig.category || "Uncategorized"}
                        ownerId={gig.ownerId}
                        ownerName={gig.ownerName}
                        createdAt={gig._creationTime}
                        isFavorite={false}
                    />
                ))
                }
            </div>
        </div>
    )
}