"use client";

import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { useMutation, useQuery } from "convex/react";

interface SubcategoryPageProps {
    params: {
        categoryName: string;
        subcategoryName: string;
    };
}

const SubcategoryPage = ({
    params
}: SubcategoryPageProps) => {
    const gigs = useQuery(api.gigs.getBySubcategory, { subcategory: params.subcategoryName });

    return (
        <div>Subcategory page</div>
    );
}

export default SubcategoryPage;