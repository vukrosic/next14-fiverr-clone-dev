import { Button } from "@/components/ui/button"
import { api } from "@/convex/_generated/api"
import { Doc } from "@/convex/_generated/dataModel"
import { useAction } from "convex/react"
import { Clock, RefreshCcw } from "lucide-react"

interface OffersProps {
    offer: Doc<"offers">
}

export const Content = ({
    offer
}: OffersProps) => {
    const orderNow = useAction(api.stripe.pay)
    const handleOrderNow = () => {
        console.log("Order Now");
        orderNow({ priceId: offer.stripePriceId });
    }
    const revisionText = offer.revisions === 1 ? "Revision" : "Revisions";
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
                    <p>{offer.delivery_days} Days Delivery</p>
                </div>
                <div className="flex space-x-2">
                    <RefreshCcw />
                    <p>{offer.revisions} {revisionText}</p>
                </div>
            </div>
            <Button className="w-full" onClick={handleOrderNow}>Order Now</Button>
            <Button className="w-full" variant={"ghost"}>Send Message</Button>
        </div>
    )
}