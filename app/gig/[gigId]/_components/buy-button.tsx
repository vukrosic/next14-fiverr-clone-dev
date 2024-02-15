// "use client";

// import { Button } from "@/components/ui/button";
// import { api } from "@/convex/_generated/api";
// import { Id } from "@/convex/_generated/dataModel";
// import { useAction, useQuery } from "convex/react";
// import { FormEvent, useEffect, useState } from "react";

// interface BuyButtonProps {
//     price: number;
// }

// export const BuyButton = ({
//     price
// }: BuyButtonProps) => {
//     const paymentId = useConsumeQueryParam("paymentId");

//     const payAndSendMessage = useAction(api.stripe.pay);

//     async function handleSendMessage(event: FormEvent) {
//         event.preventDefault();
//         const paymentUrl = await payAndSendMessage({ text: newMessageText });
//         window.location.href = paymentUrl!;
//     }

//     return (
//         <Button onClick={handleSendMessage}>${price} USD</Button>
//     )

// }


// function useConsumeQueryParam(name: string) {
//     const [value] = useState(
//         new URLSearchParams(window.location.search).get(name)
//     );

//     useEffect(() => {
//         const currentUrl = new URL(window.location.href);
//         const searchParams = currentUrl.searchParams;
//         searchParams.delete(name);
//         const consumedUrl =
//             currentUrl.origin + currentUrl.pathname + searchParams.toString();
//         window.history.replaceState(null, "", consumedUrl);
//     }, []);
//     return value;
// }