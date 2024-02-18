"use client";

import { EmptySearch } from "@/app/(dashboard)/_components/empty-search";
import useStoreUserEffect from "@/hooks/use-store-user-effect";
import { useRouter } from "next/navigation";

const CreatingUser = () => {
    const userId = useStoreUserEffect();
    const router = useRouter();
    if (userId === null) {
        return <EmptySearch />;
    }

    if (userId !== null) {
        router.replace("/");
    }
}

export default CreatingUser;