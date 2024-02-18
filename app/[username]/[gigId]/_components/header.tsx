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
        <div className="flex px-36 py-8">
            <div className="flex items-center space-x-3 ">
                <Home className="w-4 h-4" />
                <p className="text-muted-foreground">/</p>
                <Link href={`/${category}`}>{category}</Link>
                <p className="text-muted-foreground">/</p>
                <Link href={`/${category}/${subcategory}`}>{subcategory}</Link>
            </div>
            <div className="flex ml-auto">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant={"ghost"}>
                                <Star className="w-5 h-5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Favorite</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant={"ghost"}>
                                <Clipboard className="w-5 h-5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Copy URL</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
        </div>
    )
}