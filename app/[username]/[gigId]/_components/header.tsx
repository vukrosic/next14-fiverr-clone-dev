import { Button } from "@/components/ui/button";
import { Clipboard, Home, Save } from "lucide-react";
import Link from "next/link";

interface HeaderProps {
    category: string;
    subcategory: string;
}

export const Header = ({ category, subcategory }: HeaderProps) => {
    return (
        <div className="flex px-36 py-8">
            <div className="flex items-center space-x-3 ">
                <Home className="w-4 h-4" />
                <p className="text-muted-foreground">/</p>
                <Link href={`/${category}`}>{category}</Link>
                <p className="text-muted-foreground">/</p>
                <Link href={`/${category}/${subcategory}`}>{subcategory}</Link>
            </div>
            <div className="flex ml-auto">
                <Button variant={"ghost"}>
                    <Save className="w-5 h-5" />
                </Button>
                <Button variant={"ghost"}>
                    <Clipboard className="w-5 h-5" />
                </Button>

            </div>
        </div>
    )
}