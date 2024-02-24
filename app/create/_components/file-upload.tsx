"use client";

import { FormEvent, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';

interface FileUploadProps {
    gigId: string;
}

export const FileUpload = ({ gigId }: FileUploadProps) => {
    const generateUploadUrl = useMutation(api.gig.generateUploadUrl);
    console.log(generateUploadUrl);
    const saveImageUrl = useMutation(api.gig.saveImageUrl);

    const imageInput = useRef<HTMLInputElement>(null);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    const [name] = useState(() => "User " + Math.floor(Math.random() * 10000));
    async function handleSendImage(event: FormEvent) {
        event.preventDefault();

        // Step 1: Get a short-lived upload URL
        const postUrl = await generateUploadUrl();

        // // Step 2: POST the file to the URL
        // const result = await fetch(postUrl, {
        //     method: "POST",
        //     headers: { "Content-Type": selectedImage!.type },
        //     body: selectedImage,
        // });
        // const { storageId } = await result.json();
        // // Step 3: Save the newly allocated storage id to the database
        // await saveImageUrl({ storageId, author: name });

        // setSelectedImage(null);
        // imageInput.current!.value = "";
    }
    return (
        <form onSubmit={handleSendImage}>
            <input
                type="file"
                accept="image/*"
                ref={imageInput}
                onChange={(event) => setSelectedImage(event.target.files![0])}
                disabled={selectedImage !== null}
            />
            <input
                type="submit"
                value="Send Image"
                disabled={selectedImage === null}
            />
        </form>
    );
}