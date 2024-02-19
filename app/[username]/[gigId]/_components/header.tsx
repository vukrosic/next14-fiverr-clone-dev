import { Button } from "@/components/ui/button";
import { Clipboard, Home, Save, Star } from "lucide-react";
import Link from "next/link";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"


interface HeaderProps {
    category: string;
    subcategory: string;
}

export const Header = ({ category, subcategory }: HeaderProps) => {
    return (
        <div
            className="
            flex 
            py-8 
            w-full 
            h-fit 
            items-center 
            justify-center 
            space-x-2
            sm:space-x-1
            md:space-x-3 
            text-sm 
            md:text-md 
            lg:text-lg"
        >
            <Home className="w-4 h-4" />
            <p className="text-muted-foreground">/</p>
            <Link href={`/${category}`}>{category}</Link>
            <p className="text-muted-foreground">/</p>
            <Link href={`/${category}/${subcategory}`}>{subcategory}</Link>
        </div>
    )
}