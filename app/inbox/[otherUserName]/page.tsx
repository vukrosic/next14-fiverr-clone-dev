"use client";

import { Input } from "@/components/ui/input";
import Form from "./_components/form";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useConversation } from "@/hooks/use-conversation";
import Body from "./_components/body";
import { useCallback, useEffect, useState } from "react";

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
    const [conversation, setConversation] = useState<any>(null);

    const get = useMutation(api.conversations.getOrCreateConversation);
    const conv = useQuery(api.conversations.getConversation, { username: params.otherUserName });
    useEffect(() => {
        const callMutation = async () => {
            try {
                const result = await get({ otherUsername: params.otherUserName });
                setConversation(result);
            } catch (error) {
                console.error('Mutation failed:', error);
            }
        };

        callMutation();
    }, [get, params.otherUserName]);

    if (conversation === null || conv === undefined || conv === null) {
        return <div className="text-center text-muted-foreground text-3xl font-semibold p-4 animation-pulse">Loading...</div>
    }

    // if (conversation === undefined || conversation === null) {
    //     return <div className="text-center text-muted-foreground text-3xl font-semibold p-4 animation-pulse">Loading...</div>
    // }

    // if (conversation.conversation === null) {
    //     return <div className="text-center text-muted-foreground text-3xl font-semibold p-4">No conversation found...</div>
    // }

    // if (currentUser === undefined || otherUser === undefined || conversation === undefined) {
    //     return <div className="text-center text-muted-foreground text-3xl font-semibold p-4 animation-pulse">Loading...</div>
    // }

    // if (currentUser === null || otherUser === null || conversation === null) {
    //     return <div className="text-center text-muted-foreground text-3xl font-semibold p-4">Somethingn went wrong...</div>
    // }
    console.log(conversation);
    return (
        <div className="h-full">
            <div className="h-full flex flex-col">
                {/* <Header conversation={conversation} /> */}
                <Body messages={conv.messagesWithUsers} />
                <Form
                    userId={conversation.currentUser._id}
                    conversationId={conversation.conversation._id}
                />
            </div>
        </div>
    );
};
export default ConversationPage;