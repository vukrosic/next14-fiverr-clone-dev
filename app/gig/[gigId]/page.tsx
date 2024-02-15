"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import Link from "next/link";

import Image from "next/image";
import { ConvexImage } from "@/components/convex-image";
import { Description } from "@/components/description";


interface GigIdPageProps {
    params: {
        gigId: string;
    };
};

const GigIdPage = ({
    params,
}: GigIdPageProps) => {
    const gig = useQuery(api.gig.get, { id: params.gigId as Id<"gigs"> });
    const { mutate, pending } = useApiMutation(api.gig.remove);

    const identity = useAuth();

    const onDelete = async () => {
        mutate({ id: params.gigId as Id<"gigs"> });
        window.location.href = "/";
    };

    if (!identity) {
        throw new Error("Unauthorized");
    }


    if (gig === undefined) {
        return null;
    }

    if (gig === null) {
        return <div className="text-3xl p-12 text-muted-foreground">Not found</div>;
    }
    return (
        <>
            <div className="space-y-8 2xl:px-64 xl:px-36 md:p-12 px-12">
                <div className="flex flex-col sm:flex-row sm:space-y-1 justify-end pr-2">
                    {gig.ownerId === identity.userId ? (
                        <>
                            <Link href={`/gig/${gig._id}/edit`}>
                                <Button disabled={pending} variant={"secondary"} className="w-full">
                                    Edit
                                </Button>
                            </Link>
                            <Button disabled={pending} variant={"secondary"} onClick={onDelete}>
                                Delete
                            </Button>
                            <Button>${gig.price} USD</Button>
                            <Button variant={"secondary"}>Message</Button>
                        </>
                    ) : (
                        <>
                            <Button variant={"secondary"}>Message</Button>
                        </>
                    )}
                </div>

                <h1 className="md:text-5xl sm:text-3xl xs:text-2xl font-bold break-words outline-none text-[#3F3F3F]">{gig.title}</h1>

                <ConvexImage
                    storageId={gig.storageId}
                    title={gig.title}
                />

                <div className="flex rounded-md border border-zinc-300 items-center space-x-4 w-fit p-2 cursor-default">
                    <p className="text-muted-foreground">👨‍🎨 Creator: {gig.ownerName}</p>
                </div>
                <p className="italic">About this gig:</p>
            </div>
            <Description
                id={gig._id}
                initialContent={gig.description}
                editable={false}
                className="pb-40 pt-6 2xl:px-[200px] xl:px-[90px] xs:px-[17px]"
            />
        </>
    );
};

export default GigIdPage;