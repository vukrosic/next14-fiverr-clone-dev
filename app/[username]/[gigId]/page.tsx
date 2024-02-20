"use client";

import { useQuery } from "convex/react"
import { Header } from "./_components/header"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { Offers } from "./_components/offers";
import { Seller } from "./_components/seller";
import { Images } from "./_components/images";


interface PageProps {
    params: {
        username: string
        gigId: string
    }
}

const GigPage = ({
    params
}: PageProps) => {
    const gig = useQuery(api.gig.get, { id: params.gigId as Id<"gigs"> });
    const seller = useQuery(api.users.getUserByUsername, { username: params.username });
    const categoryAndSubcategory = useQuery(api.gig.getCategoryAndSubcategory, { gigId: params.gigId as Id<"gigs"> });
    const offers = useQuery(api.offers.get, { gigId: params.gigId as Id<"gigs"> });
    const orders = useQuery(api.orders.getByGig, { gigId: params.gigId as Id<"gigs"> });
    const reviews = useQuery(api.reviews.get, { gigId: params.gigId as Id<"gigs"> });

    if (gig === undefined || reviews === undefined || orders === undefined || seller === undefined || categoryAndSubcategory === undefined || offers == undefined) {
        return <div>Loading...</div>
    }

    if (gig === null || orders === null || seller === null || categoryAndSubcategory === null || offers === null) {
        return <div>Not found</div>
    }

    return (
        <div className="flex flex-col sm:flex-row w-full sm:justify-center h-[3000px] p-0 sm:p-6 md:p-16 lg:px-64 space-x-0 sm:space-x-3 lg:space-x-16">
            <div className="w-full">
                <Header
                    {...categoryAndSubcategory}
                />
                <h1 className="pb-12 text-3xl font-bold break-words text-[#3F3F3F]">{gig.title}</h1>
                <Seller
                    seller={seller}
                    orders={orders}
                    reviews={reviews}
                />
                <Images
                    images={gig.images}
                />
            </div>
            <Offers
                offers={offers}
            />
            {/* <h1 className="bg-red-200">This is title</h1>
            <div className="flex sm:sticky w-full sm:w-[300px] sm:h-[300px] sm:right-4 sm:top-4 z-[1] bg-blue-500">asdf</div> */}
        </div>

    )
}

export default GigPage