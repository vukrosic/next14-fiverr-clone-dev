'use client';

import clsx from "clsx";
import Image from "next/image";
import { useState } from "react";
import { format } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const MessageBox = () => {

    // make a random true or false
    const isOwn = Math.random() > 0.5;

    const container = clsx('flex gap-3 p-4', isOwn && 'justify-end');
    const avatar = clsx(isOwn && 'order-2');
    const body = clsx('flex flex-col gap-2', isOwn && 'items-end');
    const message = clsx(
        'text-sm w-fit overflow-hidden',
        isOwn ? 'bg-sky-500 text-white' : 'bg-gray-100',
        false ? 'rounded-md p-0' : 'rounded-full py-2 px-3'
    );

    return (
        <div className={container}>
            <div className={avatar}>
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
            <div className={body}>
                <div className="flex items-center gap-1">
                    <div className="text-sm text-gray-500">
                        {/* {data.sender.name} */} Vuk Rosic
                    </div>
                    <div className="text-xs text-gray-400">
                        {format(new Date(data.createdAt), 'p')}
                    </div>
                </div>
                <div className={message}>
                    <div>{data.body}</div>
                </div>
                {isLast && isOwn && seenList.length > 0 && (
                    <div
                        className="
                        text-xs 
                        font-light 
                        text-gray-500
                        "
                    >
                        {`Seen by ${seenList}`}
                    </div>
                )}
            </div>
        </div>
    );
}

export default MessageBox;