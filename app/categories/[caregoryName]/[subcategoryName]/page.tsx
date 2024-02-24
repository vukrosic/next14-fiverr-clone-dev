"use client";

import { GigList } from "@/app/(dashboard)/_components/gig-list";
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { useMutation, useQuery } from "convex/react";
import { startCase } from 'lodash';

interface SubcategoryPageProps {
    params: {
        categoryName: string;
        subcategoryName: string;
    };
    searchParams: {
        search?: string;
        favorites?: string;
    };
}

const SubcategoryPage = ({
    params,
    searchParams
}: SubcategoryPageProps) => {
    const subcategory = startCase(params.subcategoryName);
    const gigs = useQuery(api.gigs.getBySubcategory, { subcategory: subcategory });

    return (
        <GigList
            query={searchParams}
        />
    );
}

export default SubcategoryPage;