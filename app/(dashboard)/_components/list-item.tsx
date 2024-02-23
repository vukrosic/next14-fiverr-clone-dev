import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import { Doc } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import queryString from "query-string";
import { kebabCase } from "lodash";

interface ListItemProps {
    className: string;
    title: string;
    subcategory: Doc<"subcategories">;
}

export const ListItem = ({ className, title, subcategory }: ListItemProps) => {
    const router = useRouter();

    const handleClick = () => {
        const url = queryString.stringifyUrl({
            url: "/",
            query: {
                filter: subcategory.name,
            },
        }, { skipEmptyString: true, skipNull: true });
        router.push(url);
    };

    return (
        <li>
            <button
                className={cn(
                    "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground bg-red-500",
                    className
                )}
                onClick={handleClick}
            >
                <div className="text-sm font-medium leading-none">{title}</div>
            </button>
        </li>
    )
}