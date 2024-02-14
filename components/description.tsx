"use client";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import {
    BlockNoteEditor
} from "@blocknote/core";
import {
    BlockNoteView,
    useBlockNote
} from "@blocknote/react";
import "@blocknote/react/style.css";
import { useMutation } from "convex/react";
import { AlertOctagon } from "lucide-react";
import { toast } from "sonner";

interface DescriptionProps {
    id: Id<"gigs">;
    initialContent?: string;
    editable: boolean;
    className?: string;
}

export const Description = ({
    id,
    initialContent,
    editable,
    className
}: DescriptionProps) => {
    const update = useMutation(api.gig.updateDescription);

    const editor: BlockNoteEditor = useBlockNote({
        editable,
        initialContent:
            initialContent
                ? JSON.parse(initialContent)
                : undefined,
        onEditorContentChange: (editor) => {
            if (JSON.stringify(editor.topLevelBlocks, null, 2).length < 20000) {
                update({
                    id: id,
                    description: JSON.stringify(editor.topLevelBlocks, null, 2)
                })
            } else {
                toast.error("Description is too long. Not saved.", {
                    duration: 2000,
                    icon: <AlertOctagon />
                });
            }
        },
    });
    return (
        <BlockNoteView editor={editor} theme="light" className={className} />
    );
}