"use client";

import {
    BlockNoteEditor,
    PartialBlock
} from "@blocknote/core";
import {
    BlockNoteView,
    useBlockNote
} from "@blocknote/react";
import "@blocknote/core/style.css";

interface DescriptionEditorProps {
    initialContent?: string;
    onChange: (content: string) => void;
    editable?: boolean;
}

export const DescriptionEditor = ({
    initialContent,
    onChange,
    editable
}: DescriptionEditorProps) => {
    const editor: BlockNoteEditor = useBlockNote({
        editable,
        initialContent:
            initialContent
                ? JSON.parse(initialContent)
                : undefined,
        onEditorContentChange: (editor) => {
            onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
        },
    });
    return (
        <div>
            <BlockNoteView editor={editor} theme="light" />
        </div>
    );
}