import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Doc } from "@/convex/_generated/dataModel"
import { Content } from "./content"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Clipboard, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

interface OffersProps {
    offers: Doc<"offers">[]
}

export const Offers = ({
    offers
}: OffersProps) => {
    return (
        // <div className="flex sm:sticky sm:fixed bg-white right-4 top-4 z-[1] bg-blue-500">
        <div className=" sticky h-fit top-4 z-[1]">
            {/* Buttons */}
            <div className="flex ml-auto">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant={"ghost"}>
                                <Star className="w-5 h-5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Favorite</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant={"ghost"}>
                                <Clipboard className="w-5 h-5" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Copy URL</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
            {/* Offers */}
            <Tabs defaultValue={offers[0]._id} className="w-full sm:w-[400px] bg-red-500">
                <TabsList className="w-full">
                    {offers.map((offer) => {
                        return (
                            <TabsTrigger className="w-full" key={offer._id} value={offer._id}>{offer.tier}</TabsTrigger>
                        )
                    })}
                </TabsList>
                {offers.map((offer) => {
                    return (
                        <TabsContent className="border" key={offer._id} value={offer._id}>
                            <Content
                                offer={offer}
                            />
                        </TabsContent>
                    )
                })}
            </Tabs>

        </div>
    )
}