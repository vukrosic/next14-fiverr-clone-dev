"use client";

import { SignInButton, SignUpButton, UserButton, useClerk } from "@clerk/nextjs";
import { SearchInput } from "./search-input";
import { Button } from "@/components/ui/button";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Loading } from "@/components/auth/loading";
import { useQuery } from "convex/react";
import { Heart, MessageCircle } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Doc } from "@/convex/_generated/dataModel";
import { CategoriesFullType } from "@/types";
import { kebabCase } from 'lodash';
import queryString from "query-string";
import { ListItem } from "./list-item";


const Navbar = () => {
    const categories = useQuery(api.categories.get);
    const currentUser = useQuery(api.users.getCurrentUser);
    const searchParams = useSearchParams();
    const favorites = searchParams.get("favorites");
    const filter = searchParams.get("filter");

    const router = useRouter();

    if (categories === undefined) {
        return <Loading />;
    }

    const onClickInbox = () => {
        router.push("/inbox");
    }

    const clearFilters = () => {
        router.push("/");
    }

    return (
        <>
            <Separator />
            <div className="flex items-center gap-x-4 p-5">
                <div className="hidden lg:flex lg:flex-1">
                    <SearchInput />
                </div>

                <Button
                    onClick={clearFilters}
                    variant="ghost"
                    disabled={!filter}
                    className="mr-12"
                >
                    Clear filters
                </Button>

                {currentUser && (
                    <>
                        <Button onClick={onClickInbox} variant={"ghost"}>
                            <MessageCircle />
                        </Button>
                        <Button
                            asChild
                            variant={favorites ? "secondary" : "ghost"}
                            size="lg"
                            className="p-4"
                        >
                            <Link
                                href={{
                                    pathname: "/",
                                    query: favorites ? {} : { favorites: true }
                                }}
                                className="p-0"
                            >
                                <Heart className={favorites ? "fill-black" : ""} />
                            </Link>
                        </Button>
                        <Button onClick={() => router.push(`/seller/${currentUser.username}/manage-gigs`)}>
                            Switch To Selling
                        </Button>
                        <UserButton />
                    </>
                )}
                {!currentUser && (
                    <>
                        <Button variant="default" asChild>
                            <SignUpButton mode="modal" afterSignUpUrl="/sign-up" />
                        </Button>
                        <Button variant="ghost" asChild>
                            <SignInButton mode="modal" afterSignUpUrl="/sign-up" />
                        </Button>

                    </>
                )}
                <Dialog>
                    <DialogTrigger>Filter</DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Filter gigs by category</DialogTitle>
                        </DialogHeader>
                        {/* Mapping through categories */}
                        {categories.map((category, index) => (
                            <div key={index}>
                                {/* Displaying category name */}
                                <h3>{category.name}</h3>

                                {/* Mapping through subcategories */}
                                {category.subcategories.map((subcategory, subIndex) => (
                                    // <ListItem
                                    //     className="w-fit"
                                    //     key={subcategory.name}
                                    //     title={subcategory.name}
                                    //     subcategory={subcategory}
                                    // />
                                    <p key={subIndex}>
                                        {subcategory.name}
                                    </p>
                                ))}
                            </div>
                        ))}
                    </DialogContent>
                </Dialog>

            </div>
            <NavigationMenu>
                <NavigationMenuList className="flex space-x-6 justify-center ml-3 mx-2 px-4 m-auto flex-wrap">
                    {categories.map((category: CategoriesFullType) => {
                        return (
                            <NavigationMenuItem key={category.name} className="w-fit">
                                <NavigationMenuTrigger className="p-0 w-fit">{category.name}</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid 2xl:w-[1200px] sm:w-[600px] w-[300px] 2xl:grid-cols-5 sm:grid-cols-2 grid-cols-1 gap-3 p-4">
                                        {category.subcategories.map((subcategory) => (
                                            <ListItem
                                                className="w-fit"
                                                key={subcategory.name}
                                                title={subcategory.name}
                                                subcategory={subcategory}
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