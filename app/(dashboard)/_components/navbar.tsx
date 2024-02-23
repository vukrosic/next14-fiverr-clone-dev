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
import { Separator } from "@/components/ui/separator";
import { Doc } from "@/convex/_generated/dataModel";
import { CategoriesFullType } from "@/types";
import { kebabCase } from 'lodash';


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
            <Separator />
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
                <NavigationMenuList className="flex space-x-6 justify-center ml-3 mx-2 px-4 m-auto flex-wrap">
                    {categories.map((category: CategoriesFullType) => {
                        return (
                            <NavigationMenuItem key={category.name} className="w-fit">
                                <NavigationMenuTrigger className="p-0">{category.name}</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid 2xl:w-[1200px] sm:w-[600px] w-[300px] 2xl:grid-cols-5 sm:grid-cols-2 grid-cols-1 gap-3 p-4">
                                        {category.subcategories.map((subcategory) => (
                                            <ListItem
                                                key={subcategory.name}
                                                title={subcategory.name}
                                                href={`/categories/${kebabCase(category.name)}/${kebabCase(subcategory.name)}`}
                                            />
                                        ))}
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        );
                    })}
                </NavigationMenuList>
            </NavigationMenu>
            <Separator />
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