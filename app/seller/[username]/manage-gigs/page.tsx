"use client";

import Link from "next/link";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";

import { GigList } from "./_components/gig-list";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "./_components/data-table";
import { GigData, columns } from "./_components/columns";
import { Loading } from "@/components/auth/loading";

const ManageGigs = () => {
    const currentUser = useQuery(api.users.getCurrentUser);
    const gigs = useQuery(api.gigs.getGigsWithOrderAmountAndRevenue);

    if (gigs === undefined || currentUser === undefined) {
        return <Loading />;
    }

    const data: GigData[] = gigs.map(gig => ({
        id: gig._id,
        title: gig.title,
        image: "https://via.placeholder.com/150",
        clicks: gig.clicks,
        orders: gig.orderAmount,
        revenue: gig.totalRevenue,
        username: currentUser.username
    }));

    return (
        <>
            <div className="flex items-center">
                <div className="space-y-2">
                    <h1 className="text-4xl font-semibold">Gigs</h1>
                    <p className="text-muted-foreground">
                        Manage, create and edit your gigs and offers.
                    </p>
                </div>
                <Button className="ml-auto" variant={"blue"}>
                    <Link href={`/seller/${currentUser?.username}/manage-gigs/create`}>Create</Link>
                </Button>
            </div>
            <Separator className="my-6" />
            <DataTable columns={columns} data={data} />
            {/* <GigList /> */}
        </>
    )
}

export default ManageGigs;