"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import useStoreUserEffect from "@/hooks/use-store-user-effect";
import { useUser } from "@clerk/nextjs";
import { useAction, useConvexAuth, useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { SelectCountry } from "./_components/select-country";
import { SelectLanguages } from "./_components/select-languages";
import { Button } from "@/components/ui/button";
import { useApiMutation } from "@/hooks/use-api-mutation";

const SignUpPage = () => {
    const { isAuthenticated } = useConvexAuth();
    const storeUser = useMutation(api.users.store);
    const router = useRouter();
    const [country, setCountry] = useState<string>("");
    const [languages, setLanguages] = useState<string[]>([]);
    const [userId, setUserId] = useState<Id<"users">>();

    const createStripe = useAction(api.users.createStripe);

    if (!isAuthenticated) {
        router.push("/");
    }

    useEffect(() => {
        const storeUserData = async () => {
            if (isAuthenticated) {
                try {
                    setUserId(await storeUser());
                    //router.push("/");
                } catch (error) {
                    console.error(error);
                }
            }
        }

        storeUserData();
    }, [isAuthenticated, storeUser, router]);

    if (userId === undefined) {
        return <div>Loading...</div>;
    }


    return <div className="flex flex-col w-full h-full items-center justify-center gap-y-8">
        <SelectCountry
            setCountry={setCountry}
        />
        <SelectLanguages
            userId={userId}
        />
        <Button
            onClick={async () => {
                const res = await createStripe({ userId });
                console.log(res);
            }}
        >
            Create stripe
        </Button>
    </div>;
}
export default SignUpPage;