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
        <div className="px-36">
            <div className="flex space-x-16">
                <Header
                    {...categoryAndSubcategory}
                />
                <Offers
                    offers={offers}
                />
            </div>
        </div>
    )
}

export default GigPage