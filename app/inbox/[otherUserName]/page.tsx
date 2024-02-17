"use client";

import { Input } from "@/components/ui/input";
import Form from "./_components/form";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useConversation } from "@/hooks/use-conversation";
import Body from "./_components/body";

interface FormProps {
    params: { otherUserName: string };
}

const ConversationPage = ({
    params,
}: FormProps) => {

    // const {
    //     currentUser,
    //     otherUser,
    //     conversation
    // } = useConversation(params.otherUserName);

    const conversationData = useQuery(api.conversations.getConversation, {
        username: params.otherUserName
    });

    if (conversationData === undefined || conversationData === null) {
        return <div className="text-center text-muted-foreground text-3xl font-semibold p-4 animation-pulse">Loading...</div>
    }

    if (conversationData.conversation === null) {
        return <div className="text-center text-muted-foreground text-3xl font-semibold p-4">No conversation found...</div>
    }

    // if (currentUser === undefined || otherUser === undefined || conversation === undefined) {
    //     return <div className="text-center text-muted-foreground text-3xl font-semibold p-4 animation-pulse">Loading...</div>
    // }

    // if (currentUser === null || otherUser === null || conversation === null) {
    //     return <div className="text-center text-muted-foreground text-3xl font-semibold p-4">Somethingn went wrong...</div>
    // }

    return (
        <div className="h-full">
            <div className="h-full flex flex-col">
                {/* <Header conversation={conversation} /> */}
                <Body messages={conversationData.messages} />
                <Form
                    userId={conversationData.currentUser._id}
                    conversationId={conversationData.conversation._id}
                />
            </div>
        </div>
    );
};
export default ConversationPage;