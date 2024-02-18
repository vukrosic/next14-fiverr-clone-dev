"use client";

import { UserButton, useClerk } from "@clerk/nextjs";
import { SearchInput } from "./search-input";
import { Button } from "@/components/ui/button";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Loading } from "@/components/auth/loading";
import { useQuery } from "convex/react";
import { MessageCircle } from "lucide-react";



const Navbar = () => {
    const { user } = useClerk();
    const { mutate: createGig,
        pending: pendingCreateGig,
    } = useApiMutation(api.gig.create);
    const categories = useQuery(api.categories.get);
    const currentUser = useQuery(api.users.getCurrentUser);

    const router = useRouter();

    if (!user) {
        throw new Error("Unauthorized");
    }

    if (categories === undefined) {
        return <Loading />;
    }

    const onClickInbox = () => {
        router.push("/inbox");
    }

    const onClickCreate = () => {

        createGig({
            title: "Untitled",
            description: "",
            price: 0,
        })
            .then((id) => {
                toast.success("Gig created");
                router.push(`/gig/${id}/edit`);
            })
            .catch(() => toast.error("Failed to create gig"));
    }
    return (
        <>
            <div className="flex items-center gap-x-4 p-5">
                <div className="hidden lg:flex lg:flex-1">
                    <SearchInput />
                </div>
                <Button onClick={onClickInbox} variant={"ghost"}>
                    <MessageCircle />
                </Button>
                {currentUser && (
                    <Button onClick={() => router.push(`/seller/${currentUser.username}`)}>
                        Switch To Selling
                    </Button>
                )}
                <UserButton />
            </div>
            <NavigationMenu>
                <NavigationMenuList className="grid lg:grid-cols-5 sm:grid-cols-2 grid-cols-1">
                    {/* <NavigationMenuItem>
                        <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                                <li className="row-span-3">
                                    <NavigationMenuLink asChild>
                                        <a
                                            className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                            href="/"
                                        >
                                            <div className="mb-2 mt-4 text-lg font-medium">
                                                shadcn/ui
                                            </div>
                                            <p className="text-sm leading-tight text-muted-foreground">
                                                Beautifully designed components that you can copy and
                                                paste into your apps. Accessible. Customizable. Open
                                                Source.
                                            </p>
                                        </a>
                                    </NavigationMenuLink>
                                </li>
                                <ListItem href="/docs" title="Introduction">
                                    Re-usable components built using Radix UI and Tailwind CSS.
                                </ListItem>
                                <ListItem href="/docs/installation" title="Installation">
                                    How to install dependencies and structure your app.
                                </ListItem>
                                <ListItem href="/docs/primitives/typography" title="Typography">
                                    Styles for headings, paragraphs, lists...etc
                                </ListItem>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem> */}
                    {categories.map((category) => {
                        return (
                            <NavigationMenuItem key={category.name} className="w-fit">
                                <NavigationMenuTrigger>{category.name}</NavigationMenuTrigger>
                                {/* <NavigationMenuContent>
                                    <ul className="grid 2xl:w-[1200px] sm:w-[600px] w-[300px] 2xl:grid-cols-5 sm:grid-cols-2 grid-cols-1 gap-3 p-4 ">
                                        {category.subcategories.map((subcategory) => (
                                            <ListItem
                                                key={subcategory.name}
                                                title={subcategory.name}
                                                href={`/category/${category.name}/${subcategory.name}`}
                                            >
                                                {subcategory.name}
                                            </ListItem>
                                        ))}
                                    </ul>
                                </NavigationMenuContent> */}
                            </NavigationMenuItem>
                        );
                    })}
                    {/* <NavigationMenuItem>
                        <NavigationMenuTrigger>Visual Arts & Design</NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid 2xl:w-[1200px] sm:w-[600px] w-[300px] 2xl:grid-cols-5 sm:grid-cols-2 grid-cols-1 gap-3 p-4 ">
                                {visualArtsAndDesign.map((category) => (
                                    <ListItem
                                        key={category.title}
                                        title={category.title}
                                        href={category.href}
                                    >
                                        {category.description}
                                    </ListItem>
                                ))}
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href="/docs" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                Documentation
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem> */}
                </NavigationMenuList>
            </NavigationMenu>
        </>
    );
}

export default Navbar;

const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref}
                    className={cn(
                        "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    )
})
ListItem.displayName = "ListItem"