"use client";

import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";

export const useConversation = (otherUserName: string) => {
    const currentUser = useQuery(api.users.getCurrentUser);

    const otherUser = useQuery(api.users.getUserByUsername, {
        username: otherUserName
    });

    const createConversation = useMutation(api.conversations.create);

    const conversations = useQuery(api.conversations.get);

    const conversation = conversations?.find((conversation) => {
        return (conversation.participantOneId === currentUser?._id && conversation.participantTwoId === otherUser?._id) || (conversation.participantOneId === otherUser?._id && conversation.participantTwoId === currentUser?._id);
    });


    const messages = useQuery(api.messages.get);

    if (conversation !== undefined && messages !== undefined) {
        messages.filter((message) => {
            return message.conversationId === conversation._id;
        });

        return {
            currentUser,
            otherUser,
            conversation,
            messages
        }
    }

    // if (otherUser === null) {
    //     return {
    //         currentUser,
    //         otherUser,
    //         conversation: null
    //     }
    // };

    return {
        currentUser,
        otherUser,
        conversation,
        messages
    }
};
