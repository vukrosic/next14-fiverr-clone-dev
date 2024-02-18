"use client";

import { useQuery } from "convex/react"
import { Header } from "./_components/header"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"

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

    if (gig === undefined || categoryAndSubcategory === undefined) {
        return <div>Loading...</div>
    }
    return (
        <div className="px-36">
            <Header
                {...categoryAndSubcategory}
            />
        </div>
    )
}

export default GigPage