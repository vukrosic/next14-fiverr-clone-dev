import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { languages } from "@/constants";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { useQuery } from "convex/react";
import { useEffect, useState } from "react";

interface SelectLanguagesProps {
    userId: Id<"users">;
}

export const SelectLanguages = ({
    userId
}: SelectLanguagesProps) => {
    const currentLanguages = useQuery(api.languages.get, { userId });
    const [selectedLanguage, setSelectedLanguage] = useState();
    const {
        mutate,
        pending,
    } = useApiMutation(api.languages.add);

    if (currentLanguages === undefined) {
        return <div>Loading...</div>;
    }

    const handleAdd = async () => {
        try {
            await mutate({
                userId,
                language: selectedLanguage,
            });
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="space-y-3">
            <p>{currentLanguages.toString()}</p>
            <Select>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a language" />
                </SelectTrigger>
                <SelectContent>
                    {languages.map((language) => (
                        <SelectItem key={language.code} value={language.name}>
                            {language.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Button variant={"ghost"} onClick={handleAdd}>Add</Button>
            <Button variant={"secondary"} className="ml-2">Clear</Button>
        </div>
    );
};