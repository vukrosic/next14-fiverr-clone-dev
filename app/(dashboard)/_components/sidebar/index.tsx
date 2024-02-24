"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LayoutDashboardIcon, Star } from "lucide-react";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const font = Poppins({
    subsets: ["latin"],
    weight: ["600"],
})

export const Sidebar = () => {
    const searchParams = useSearchParams();
    const favorites = searchParams.get("favorites");
    return (
        <aside className="fixed z-[1] left-0 bg-blue-950 h-full w-[300px] hidden lg:flex p-3 pt-5 flex-col gap-y-4 text-white">
            <Link href="/">
                <div className="flex items-center gap-x-6 w-full">
                    <Image
                        src="/logo.svg"
                        alt="Logo"
                        height={60}
                        width={60}
                    />
                    <span className={cn(
                        "font-semibold text-2xl",
                        font.className,
                    )}>
                        Givian
                    </span>
                </div>
            </Link>
            <div className="space-y-1">
                <Button
                    asChild
                    variant={favorites ? "blueSecondary" : "blue"}
                    size="lg"
                    className="font-normal justify-start px-2 w-full"
                >
                    <Link href="/">
                        <LayoutDashboardIcon className="h-4 w-4 mr-2" />
                        Browse gigs
                    </Link>
                </Button>
                <Button
                    asChild
                    variant={favorites ? "blue" : "blueSecondary"}
                    size="lg"
                    className="font-normal justify-start px-2 w-full"
                >
                    <Link href={{
                        pathname: "/",
                        query: { favorites: true }
                    }}>
                        <Star className="h-4 w-4 mr-2" />
                        Favorite gigs
                    </Link>
                </Button>
            </div>
        </aside>
    );
};