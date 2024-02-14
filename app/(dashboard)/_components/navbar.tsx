"use client";

import { UserButton, useClerk } from "@clerk/nextjs";
import { SearchInput } from "./search-input";
import { Button } from "@/components/ui/button";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const Navbar = () => {
    const { user } = useClerk();
    const { mutate, pending } = useApiMutation(api.gig.create);

    const router = useRouter();

    if (!user) {
        throw new Error("Unauthorized");
    }


    const onClick = () => {
        console.log("Create");

        mutate({
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
        <div className="flex items-center gap-x-4 p-5">
            <div className="hidden lg:flex lg:flex-1">
                <SearchInput />
            </div>
            <Button onClick={onClick}>
                Create
            </Button>
        </div>
    );
}

export default Navbar;