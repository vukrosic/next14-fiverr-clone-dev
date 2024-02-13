"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { useAuth } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import Link from "next/link";

import Image from "next/image";


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
        return <div>Not found</div>;
    }
    return (
        <div className="space-y-8 2xl:px-64 xl:px-36 md:p-12">
            <div className="flex justify-end pr-2">
                {gig.ownerId === identity.userId ? (
                    <>
                        <Link href={`/gig/${gig._id}/edit`}>
                            <Button disabled={pending} variant={"secondary"}>
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
                        <Button>${gig.price} USD</Button>
                        <Button variant={"secondary"}>Message</Button>
                    </>
                )}
            </div>

            <h1 className="text-3xl font-semibold text-zinc-700">{gig.title}</h1>

            {/* {gig.imageUrl && (
                <Image
                    src={gig.imageUrl}
                    alt={gig.title}
                    width={1280}
                    height={720}
                    objectFit="cover"
                />
            )} */}

            <div className="flex rounded-md border border-zinc-300 items-center space-x-4 w-fit p-2 cursor-default">
                <p className="text-muted-foreground">👨‍🎨 Creator: {gig.ownerName}</p>
            </div>
            <p className="italic">About this gig:</p>
            <p>{gig.description}</p>
        </div>
    );
};

export default GigIdPage;