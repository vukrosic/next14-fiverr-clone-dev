import { Button } from "@/components/ui/button";
import { Clipboard, Home, Save, Star } from "lucide-react";
import Link from "next/link";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";


interface HeaderProps {
    category: string;
    subcategory: string;
    editUrl: string;
    ownerId: string;
}

export const Header = ({ category, subcategory, editUrl, ownerId }: HeaderProps) => {
    const currentUser = useQuery(api.users.getCurrentUser, {});
    return (
        <div
            className="
            flex 
            w-full 
            h-fit 
            items-center 
            space-x-2
            sm:space-x-1
            md:space-x-3 
            text-sm 
            md:text-md
            "
        >
            <Home className="w-4 h-4" />
            <p className="text-muted-foreground">/</p>
            <Link href={`/${category}`}>{category}</Link>
            <p className="text-muted-foreground">/</p>
            <Link href={`/${category}/${subcategory}`}>{subcategory}</Link>
            {(currentUser?._id === ownerId &&
                <Button variant={"secondary"}>
                    <Link href={editUrl}>
                        Edit gig
                    </Link>
                </Button>
            )}
        </div>
    )
}