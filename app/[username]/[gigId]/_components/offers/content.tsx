import { Button } from "@/components/ui/button"
import { Doc } from "@/convex/_generated/dataModel"
import { Clock, RefreshCcw } from "lucide-react"

interface OffersProps {
    offer: Doc<"offers">
}

export const Content = ({
    offer
}: OffersProps) => {
    return (
        <div className="space-y-4">
            <div className="flex pb-4 font-bold items-center">
                <h1>{offer.title}</h1>
                <p className="ml-auto text-2xl">${offer.price}</p>
            </div>
            <p>{offer.description}</p>
            <div className="flex flex-col font-semibold text-zinc-700 space-y-2">
                <div className="flex space-x-2">
                    <Clock />
                    <p>{offer.delivery_time} Days Delivery</p>
                </div>
                <div className="flex space-x-2">
                    <RefreshCcw />
                    <p>{offer.revisions} Revisions</p>
                </div>
            </div>
            <Button className="w-full">Order Now</Button>
        </div>
    )
}