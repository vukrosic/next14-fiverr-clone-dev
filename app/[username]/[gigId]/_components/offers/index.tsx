import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Doc, Id } from "@/convex/_generated/dataModel"
import { Content } from "./content"

interface OffersProps {
    offers: Doc<"offers">[];
}

export const Offers = ({
    offers,
}: OffersProps) => {
    return (
        // <div className="flex sm:sticky sm:fixed bg-white right-4 top-4 z-[1] bg-blue-500">
        <div className=" sticky h-fit top-4 z-[1]">
            {/* Offers */}
            {offers.length > 0 && (
                <Tabs defaultValue={offers[0]._id} className="w-full sm:w-[400px]">
                    <TabsList className="w-full">
                        {offers.map((offer) => {
                            return (
                                <TabsTrigger className="w-full" key={offer._id} value={offer._id}>{offer.tier}</TabsTrigger>
                            )
                        })}
                    </TabsList>
                    {offers.map((offer) => {
                        return (
                            <TabsContent key={offer._id} value={offer._id}>
                                <Content
                                    offer={offer}
                                />
                            </TabsContent>
                        )
                    })}
                </Tabs>
            )}
        </div>
    )
}