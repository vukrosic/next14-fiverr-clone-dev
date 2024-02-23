"use client";

import { UserButton } from "@clerk/nextjs";
import { GigList } from "./_components/gig-list";
import useStoreUserEffect from "@/hooks/use-store-user-effect";

interface DashboardProps {
    searchParams: {
        search?: string;
        favorites?: string;
        filter?: string;
    };
};

const Dashboard = ({
    searchParams
}: DashboardProps) => {
    const userId = useStoreUserEffect();
    if (userId === null) {
        return <div>Storing user...</div>;
    }
    return (
        <GigList
            query={searchParams}
        />
    );
};

export default Dashboard;