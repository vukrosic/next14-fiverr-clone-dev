"use client";

import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { ElementRef, useRef, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

interface PriceEditorProps {
    id: Id<"gigs">;
    price: number;
}

export const PriceEditor = ({
    id,
    price
}: PriceEditorProps) => {
    const inputRef = useRef<ElementRef<"textarea">>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState<number>(price);

    const update = useMutation(api.gig.updatePrice);

    const enableInput = () => {
        setIsEditing(true);
        setTimeout(() => {
            setValue(price);
            inputRef.current?.focus();
        }, 0);
    };

    const disableEditing = () => setIsEditing(false);

    const onInput = (value: string) => {
        if (value === "") value = "0";
        const value_num = parseFloat(value);
        setValue(value_num);
        update({
            id: id,
            price: value_num || 5
        });
    };

    return (
        <div className="flex">
            <p>$</p>
            {isEditing ? (
                <TextareaAutosize
                    ref={inputRef}
                    maxLength={3}
                    onBlur={disableEditing}
                    value={value}
                    onChange={(e) => onInput(e.target.value)}
                    className="w-full pl-2 text-3xl bg-transparent font-semibold break-words outline-none text-[#3F3F3F]"
                />
            ) : (
                <div
                    onClick={enableInput}
                    className="w-full pl-2 text-3xl font-semibold break-words outline-none text-[#3F3F3F]"
                >
                    {price}
                </div>
            )}
        </div>
    )
}