'use client';

import { useEffect, useRef, useState } from "react";



import MessageBox from "./message-box";
import { find } from "lodash";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";

interface BodyProps {
    messages: Doc<"messages">[];
}

const Body = ({
    messages
}: BodyProps) => {
    const bottomRef = useRef<HTMLDivElement>(null);
    // const [messages, setMessages] = useState(initialMessages);

    // const { conversationId } = useConversation();


    // <MessageBox
    //     isLast={i === messages.length - 1}
    //     key={message.id}
    //     data={message}
    // />

    return (
        <div className="flex-grow overflow-y-auto">
            {messages.map((message, i) => (
                <div key={message._id}>
                    {message.text}
                </div>
            ))}
            <div className="pt-24" ref={bottomRef} />
        </div>
    );
}

export default Body;