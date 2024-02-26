import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { countries } from "@/constants";

interface SelectCountryProps {
    setCountry: React.Dispatch<React.SetStateAction<string>>;
}

export const SelectCountry = ({
    setCountry
}: SelectCountryProps) => {
    return (
        <Select onValueChange={setCountry}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select a country" />
            </SelectTrigger>
            <SelectContent>
                {countries.map((country) => (
                    <SelectItem key={country.code} value={country.code}>
                        {country.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}