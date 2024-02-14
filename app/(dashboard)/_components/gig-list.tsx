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
            <h2 className="flex text-5xl font-bold text-muted-foreground justify-center items-center my-4">
                {query.favorites ? "Favorite gigs" : "All gigs"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-8 pb-10 mx-10">
                {data?.map((gig) => (
                    <GigCard
                        key={gig._id}
                        id={gig._id}
                        title={gig.title}
                        description={gig.description}
                        price={gig.price}
                        storageId={gig.storageId}
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