"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { formatDistanceToNow } from "date-fns";
import { Actions } from "@/components/actions";
import { MoreHorizontal } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { ConvexImage } from "@/components/convex-image";

import { Footer } from "./footer";
import { Overlay } from "./overlay";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

interface GigCardProps {
    id: string;
    title: string;
    description: string;
    price: number;
    storageId?: string;
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
    storageId,
    ownerId,
    ownerName,
    createdAt,
    isFavorite
}: GigCardProps) => {
    const { userId } = useAuth();

    const ownerLabel = userId === ownerId ? "You" : ownerName;
    const createdAtLabel = formatDistanceToNow(createdAt, { addSuffix: true });

    const {
        mutate: favorite,
        pending: favoritePending
    } = useApiMutation(api.gig.favorite);
    const {
        mutate: unfavorite,
        pending: unfavoritePending
    } = useApiMutation(api.gig.unfavorite);

    const toggleFavorite = () => {
        console.log(isFavorite);
        if (isFavorite) {
            unfavorite({ id })
                .catch(() => toast.error("Failed to unfavorite"));
        } else {
            favorite({ id })
                .catch(() => toast.error("Failed to favorite"));
        }
    }

    return (
        <Link href={`/gig/${id}`}>
            <div className="group aspect-[130/100] border rounded-lg flex flex-col justify-between overflow-hidden">
                <div className="relative flex-1 bg-blue-50">
                    <ConvexImage
                        storageId={storageId}
                        title={title}
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
                    onClick={toggleFavorite}
                    disabled={favoritePending || unfavoritePending}
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