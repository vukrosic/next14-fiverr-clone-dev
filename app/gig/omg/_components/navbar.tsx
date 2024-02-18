"use client";

import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface NavbarProps {
    gigId: string;
};

const Navbar = ({ gigId }: NavbarProps) => {
    return (
        <div className="flex items-center justify-end p-5">
            <UserButton />
        </div>
    );
}

export default Navbar;