"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import useStoreUserEffect from "@/hooks/use-store-user-effect";
import { useUser } from "@clerk/nextjs";
import { useConvexAuth, useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SignUpPage = () => {
    const { isAuthenticated } = useConvexAuth();
    const storeUser = useMutation(api.users.store);
    const router = useRouter();

    if (!isAuthenticated) {
        router.push("/");
    }

    useEffect(() => {
        const storeUserData = async () => {
            if (isAuthenticated) {
                try {
                    await storeUser();
                    router.push("/");
                } catch (error) {
                    console.error(error);
                }
            }
        }

        storeUserData();
    }, [isAuthenticated, storeUser, router]);



    return <div>Storing user...</div>;
}
export default SignUpPage;