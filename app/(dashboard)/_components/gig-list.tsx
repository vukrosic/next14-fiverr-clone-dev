"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { EmptySearch } from "./empty-search";
import { EmptyFavorites } from "./empty-favorites";
import { GigCard } from "./gig-card";
import { Loading } from "@/components/auth/loading";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { FullGigType } from "@/types";
import { useEffect } from "react";

interface GigListProps {
    query: {
        search?: string;
        favorites?: string;
        filter?: string;
    };
};

export const GigList = ({
    query,
}: GigListProps) => {
    const gigs: FullGigType[] | undefined = useQuery(api.gigs.get, { search: query.search, favorites: query.favorites, filter: query.filter });

    useEffect(() => {
        console.log(gigs);
    }, [gigs]);



    if (gigs === undefined) {
        return (
            <></>
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


    // // filter gigs by subcategory, 
    // filteredGigs = gigs.filter((gig) => {
    //     gig.subcategoryId

    return (
        <div>
            {/* <h2 className="flex text-3xl font-bold text-muted-foreground justify-start items-center my-4 mx-10">
                {query.favorites ? "Favorite gigs" : "All gigs"}
            </h2> */}
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