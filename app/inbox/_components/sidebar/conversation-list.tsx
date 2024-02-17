'use client';

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { MdOutlineGroupAdd } from 'react-icons/md';
import clsx from "clsx";
import ConversationBox from "./conversation-box";
import { Doc } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
// import { find, uniq } from 'lodash';

const ConversationList = () => {
    const conversations = useQuery(api.conversations.get);
    const currentUser = useQuery(api.users.getCurrentUser);

    if (conversations === undefined) {
        return <div>Loading...</div>
    }

    if (currentUser === undefined) {
        return <div>Loading...</div>
    }

    if (currentUser === null) {
        return <div>Error: Not Found</div>
    }

    const userConversations = conversations.filter((conversation) => {
        return conversation.participantOneId === currentUser._id || conversation.participantTwoId === currentUser._id;
    });

    return (
        <>
            <p className="text-zinc-300 font-medium pl-4 py-4">All conversations</p>
            <div className="space-y-3">
                {userConversations.map((conversation) => (
                    <ConversationBox
                        key={conversation._id}
                        conversation={conversation}
                        currentUser={currentUser}
                    />
                ))}
            </div>


            {/* 
            <aside className={clsx(`
            fixed 
            inset-y-0 
            pb-20
            lg:pb-0
            lg:left-20 
            lg:w-80 
            lg:block
            overflow-y-auto 
            border-r 
            border-gray-200 
      `, isOpen ? 'hidden' : 'block w-full left-0')}>
                <div className="px-5">
                    <div className="flex justify-between mb-4 pt-4">
                        <div className="text-2xl font-bold text-neutral-800">
                            Messages
                        </div>
                        <div
                            onClick={() => setIsModalOpen(true)}
                            className="
                rounded-full 
                p-2 
                bg-gray-100 
                text-gray-600 
                cursor-pointer 
                hover:opacity-75 
                transition
              "
                        >
                            <MdOutlineGroupAdd size={20} />
                        </div>
                    </div>
                    {items.map((item) => (
                        // <ConversationBox
                        //     key={item.id}
                        //     data={item}
                        //     selected={conversationId === item.id}
                        // />
                        <div key={item.id}>Conversation</div>
                    ))}
                </div>
            </aside> */}
        </>
    );
}

export default ConversationList;