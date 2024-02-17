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
    // const currentUser = useQuery(api.users.getCurrentUser);

    // const otherUser = useQuery(api.users.getUserByUsername, {
    //     username: params.otherUserName
    // });

    // const conversations = useQuery(api.conversations.get);

    // if (conversations === undefined || currentUser === undefined || otherUser === undefined) {
    //     return <div>Loading...</div>
    // }

    // if (currentUser === null || otherUser === null) {
    //     return <div>Error: Not Found</div>
    // }

    // // find this exact conversation between the two users
    // const conversation = conversations.filter((conversation) => {
    //     return (conversation.participantOneId === currentUser._id && conversation.participantTwoId === otherUser._id) || (conversation.participantOneId === otherUser._id && conversation.participantTwoId === currentUser._id);
    // });

    // if (conversation.length !== 1) {
    //     return <div>Error: Not Found</div>
    // }

    const {
        currentUser,
        otherUser,
        conversation,
        messages
    } = useConversation(params.otherUserName);

    if (currentUser === undefined || otherUser === undefined || conversation === undefined || messages === undefined) {
        return <div className="text-center text-muted-foreground text-3xl font-semibold p-4 animation-pulse">Loading...</div>
    }

    if (currentUser === null || otherUser === null || conversation === null) {
        return <div className="text-center text-muted-foreground text-3xl font-semibold p-4">Somethingn went wrong...</div>
    }

    return (
        <div className="h-full">
            <div className="h-full flex flex-col">
                {/* <Header conversation={conversation} /> */}
                <Body messages={messages} />
                <Form
                    userId={currentUser._id}
                    conversationId={conversation._id}
                />
            </div>
        </div>
    );
};
export default ConversationPage;