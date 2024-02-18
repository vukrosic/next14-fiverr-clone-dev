"use client";

import Link from "next/link";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";

import { GigList } from "./_components/gig-list";

const ManageGigs = () => {
    const currentUser = useQuery(api.users.getCurrentUser);
    return (
        <div className="pt-32 px-[300px]">
            <div className="flex items-center">
                <h1 className="text-4xl font-semibold">Gigs</h1>
                <Button className="ml-auto" variant={"blue"}>
                    <Link href={`/seller/${currentUser?.username}/manage-gigs/create`}>Create</Link>
                </Button>
            </div>
            <GigList />
        </div>
    )
}

export default ManageGigs;