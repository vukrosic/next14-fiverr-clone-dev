"use client";

import { useQuery } from "convex/react"
import { Header } from "./_components/header"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { Offers } from "./_components/offers";


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
    const categoryAndSubcategory = useQuery(api.gig.getCategoryAndSubcategory, { gigId: params.gigId as Id<"gigs"> });
    const offers = useQuery(api.offers.get, { gigId: params.gigId as Id<"gigs"> });

    if (gig === undefined || categoryAndSubcategory === undefined || offers == undefined) {
        return <div>Loading...</div>
    }
    console.log(offers)
    return (
        <div className="flex flex-col sm:flex-row w-full sm:justify-center h-[3000px]">
            <Header
                {...categoryAndSubcategory}
            />
            <Offers
                offers={offers}
            />
            {/* <h1 className="bg-red-200">This is title</h1>
            <div className="flex sm:sticky w-full sm:w-[300px] sm:h-[300px] sm:right-4 sm:top-4 z-[1] bg-blue-500">asdf</div> */}
        </div>

    )
}

export default GigPage