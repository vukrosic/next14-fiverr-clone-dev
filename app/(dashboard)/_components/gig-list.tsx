"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { EmptySearch } from "./empty-search";
import { EmptyFavorites } from "./empty-favorites";
import { GigCard } from "./gig-card";
import { Loading } from "@/components/auth/loading";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { FullGigType } from "@/types";

interface GigListProps {
    query: {
        search?: string;
        favorites?: string;
    };
};

export const GigList = ({
    query,
}: GigListProps) => {
    const gigs: FullGigType[] | undefined = useQuery(api.gigs.get, { ...query });

    if (gigs === undefined) {
        return (
            <h2 className="flex text-5xl font-bold text-muted-foreground justify-center items-center my-4">
                {query.favorites ? "Favorite gigs" : "All gigs"}
            </h2>
        )
    }

    if (!gigs?.length && query.search) {
        return (
            <EmptySearch />
        )
    }

    if (!gigs?.length && query.favorites) {
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
                {gigs?.map((gig) => (
                    <GigCard
                        key={gig._id}
                        id={gig._id}
                        sellerId={gig.sellerId}
                        title={gig.title}
                        description={gig.description}
                        createdAt={gig._creationTime}
                        isFavorite={gig.favorited}
                        storageId={gig.storageId}
                        offer={gig.offer}
                        reviews={gig.reviews}
                    />
                ))
                }
            </div>
        </div>
    )
}