"use client";

import Image from "next/image";
import Link from "next/link";
import { Overlay } from "./overlay";
import { useAuth } from "@clerk/nextjs";
import { formatDistanceToNow } from "date-fns";
import { Footer } from "./footer";
import { Actions } from "@/components/actions";
import { MoreHorizontal } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface GigCardProps {
    id: string;
    title: string;
    description: string;
    price: number;
    imageUrl: string;
    category: string;
    ownerId: string;
    ownerName: string;
    createdAt: number;
    isFavorite: boolean;
};

export const GigCard = ({
    id,
    title,
    description,
    price,
    imageUrl,
    category,
    ownerId,
    ownerName,
    createdAt,
    isFavorite
}: GigCardProps) => {
    const { userId } = useAuth();

    const ownerLabel = userId === ownerId ? "You" : ownerName;
    const createdAtLabel = formatDistanceToNow(createdAt, { addSuffix: true });
    return (
        <Link href={`/gigs/${id}`}>
            <div className="group aspect-[130/100] border rounded-lg flex flex-col justify-between overflow-hidden">
                <div className="relative flex-1 bg-blue-50">
                    <Image
                        src={imageUrl}
                        alt={title}
                        fill
                        className="object-cover"
                    />
                    <Overlay />
                    <Actions
                        id={id}
                        title={title}
                        side="right"
                    >
                        <button
                            className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none"
                        >
                            <MoreHorizontal
                                className="text-white opacity-75 hover:opacity-100 transition-opacity"
                            />
                        </button>
                    </Actions>
                </div>
                <Footer
                    isFavorite={isFavorite}
                    title={title}
                    ownerLabel={ownerLabel}
                    createdAtLabel={createdAtLabel}
                    onClick={() => { }}
                    disabled={false}
                />
            </div>
        </Link>
    )
}

GigCard.Skeleton = function BoardCardSkeleton() {
    return (
        <div className="aspect-[130/100] rounded-lg overflow-hidden">
            <Skeleton className="h-full w-full" />
        </div>
    );
};