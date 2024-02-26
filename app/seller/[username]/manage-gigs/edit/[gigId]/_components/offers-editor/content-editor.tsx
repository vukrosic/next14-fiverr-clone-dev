import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { api } from "@/convex/_generated/api"
import { Doc } from "@/convex/_generated/dataModel"
import { useApiMutation } from "@/hooks/use-api-mutation"
import { Clock, RefreshCcw } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

import { Label } from "@/components/ui/label"

interface ContentEditorProps {
    offer?: Doc<"offers">;
    gigId: string;
    tier: "Basic" | "Standard" | "Premium";
}

export const ContentEditor = ({
    offer,
    gigId,
    tier
}: ContentEditorProps) => {
    const [title, setTitle] = useState<string>(offer?.title || "");
    const [description, setDescription] = useState<string>(offer?.description || "");
    const [price, setPrice] = useState<number>(offer?.price || 5);
    const [revisions, setRevisions] = useState<number>(offer?.revisions || 1);
    const [deliveryDays, setDeliveryDays] = useState<number>(offer?.delivery_days || 2);
    const {
        mutate,
        pending,
    } = useApiMutation(api.offers.upsert);

    const handleSave = async () => {
        try {
            await mutate({
                gigId,
                title,
                description,
                tier,
                price,
                delivery_days: deliveryDays,
                revisions,
            });
            toast.success("Offer created successfully");
        } catch (error) {
            console.error(error);
            toast.error("Failed to create offer");
        }
    }

    return (
        <div className="space-y-4">
            <div>
                <Label htmlFor="title">Title:</Label>
                <Input id="title" placeholder="title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="">
                <Label htmlFor="price">Price (USD):</Label>
                <Input id="price" placeholder="price" type="number" value={price} onChange={(e) => setPrice(parseInt(e.target.value))} />
            </div>
            <div>
                <Label htmlFor="description">Description:</Label>
                <Input id="description" placeholder="description" value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div>
                <Label htmlFor="delivery">Number of days for delivery:</Label>
                <Input id="delivery" placeholder="delivery days" type="number" value={deliveryDays} onChange={(e) => setDeliveryDays(parseInt(e.target.value))} />
            </div>
            <div>
                <Label htmlFor="revisions">Number of revisions:</Label>
                <Input id="revisions" placeholder="revisions" type="number" value={revisions} onChange={(e) => setRevisions(parseInt(e.target.value))} />
            </div>

            {/*<div className="flex flex-col font-semibold text-zinc-700 space-y-2">
                <div className="flex space-x-2">
                    <Clock />
                    <Input placeholder="delivery days" type="number" value={deliveryDays} onChange={(e) => setDeliveryDays(parseInt(e.target.value))} />
                    Days Delivery
                </div>
                <div className="flex space-x-2">
                    <RefreshCcw />
                    <Input placeholder="revisions" type="number" value={revisions} onChange={(e) => setRevisions(parseInt(e.target.value))} /> Revisions
                </div>
            </div> */}
            <Button className="w-full" onClick={handleSave}>Save</Button>
        </div>
    )
}