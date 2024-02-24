'use client';

import { useEffect, useRef, useState } from "react";



import MessageBox from "./message-box";
import { find } from "lodash";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { MessageWithUserType } from "@/types";

interface BodyProps {
    messages: MessageWithUserType[];
}

const Body = ({
    messages
}: BodyProps) => {
    const bottomRef = useRef<HTMLDivElement>(null);
    // const [messages, setMessages] = useState(initialMessages);

    // const { conversationId } = useConversation();


    return (
        <div className="flex-grow overflow-y-auto">
            {messages.map((message, i) => (
                <MessageBox
                    isLast={i === messages.length - 1}
                    key={message._id}
                    message={message}
                />
            ))}
            <div className="pt-24" ref={bottomRef} />
        </div>
    );
}

export default Body;