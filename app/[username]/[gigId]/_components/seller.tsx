import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Doc } from "@/convex/_generated/dataModel";
import { Star } from "lucide-react"

interface SellerProps {
    seller: Doc<"users">;
    reviews: Doc<"reviews">[];
    orders: Doc<"orders">[];
}

export const Seller = ({
    seller,
    reviews,
    orders
}: SellerProps) => {
    const orderLabel = orders.length === 1 ? orders.length + " Order in Queue" : orders.length + " Orders in Queue";

    const averageReview = reviews.reduce((acc, review) => {
        return acc + review.communication_level + review.recommend_to_a_friend + review.service_as_described;
    }, 0) / reviews.length;

    return (
        <div className="flex space-x-4">
            <Avatar className="w-16 h-16">
                <AvatarImage src={seller.profileImageUrl || "https://github.com/shadcn.png"} />
                <AvatarFallback>{seller.username.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="w-[300px] flex flex-col justify-between gap-y-2">
                <div className="flex items-center">
                    <p className="font-bold text-lg">{seller.fullName}</p>
                    <div className="bg-yellow-100 text-red-900 font-semibold p-1 ml-auto">{seller.customTag}</div>
                </div>
                <div className="flex items-center">
                    <div className="flex gap-x-1">
                        <Star className="w-5 h-5" />
                        <p className="font-semibold">{reviews.length}</p>
                        (<p className="underline">{averageReview || 0}</p>)
                    </div>
                    <div className="ml-auto">{orderLabel}</div>
                </div>
            </div>

        </div>
    )
}