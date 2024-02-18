import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Doc } from "@/convex/_generated/dataModel"
import { Content } from "./content"

interface OffersProps {
    offers: Doc<"offers">[]
}

export const Offers = ({
    offers
}: OffersProps) => {
    return (
        <div className="sticky pt-16">
            <Tabs defaultValue="account" className="w-[400px]">
                <TabsList>
                    {offers.map((offer) => {
                        return (
                            <TabsTrigger key={offer._id} value={offer._id}>{offer.tier}</TabsTrigger>
                        )
                    })}
                </TabsList>
                {offers.map((offer) => {
                    return (
                        <TabsContent className="p-4 border w-[400px]" key={offer._id} value={offer._id}>
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