"use client";

import { UserButton } from "@clerk/nextjs";
import { SearchInput } from "./search-input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Navbar = () => {
    return (
        <div className="flex items-center gap-x-4 p-5">
            <div className="hidden lg:flex lg:flex-1">
                <SearchInput />
            </div>
            <Link href={"/create"}>
                <Button>
                    Create
                </Button>
            </Link>
            <UserButton />
        </div>
    );
}

export default Navbar;