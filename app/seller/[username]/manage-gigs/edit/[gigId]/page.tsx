"use client";

import { FileUpload } from "@/app/create/_components/file-upload";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { useAuth } from "@clerk/nextjs";
import { useMutation, useQuery } from "convex/react";
import Image from "next/image";
import Link from "next/link";
import { FormEvent, useRef, useState } from "react";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Description } from "@/components/description";
import { ConvexImage } from "@/components/convex-image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Images } from "@/app/[username]/[gigId]/_components/images";
import { TitleEditor } from "@/app/gig/omg/edit/title-editor";


interface EditdPageProps {
    params: {
        gigId: string;
    };
};

const Edit = ({ params }: EditdPageProps) => {
    const gig = useQuery(api.gig.get, { id: params.gigId as Id<"gigs"> });

    const { mutate, pending } = useApiMutation(api.gig.remove);
    const router = useRouter();

    const identity = useAuth();

    const generateUploadUrl = useMutation(api.gigMedia.generateUploadUrl);

    const imageInput = useRef<HTMLInputElement>(null);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const sendImage = useMutation(api.gigMedia.sendImage);


    // const imageUrl = useQuery(api.gig.getImageUrl, { storageId: gig?.storageId as Id<"_storage"> });

    if (!identity) {
        throw new Error("Unauthorized");
    }

    // Undefined means it's still retrieving
    if (gig === undefined) {
        return null;
    }

    if (gig === null) {
        return <div>Not found</div>;
    }

    // if (gig.ownerId !== identity.userId)
    //     return (
    //         <div className="space-y-8 2xl:px-64 xl:px-36 md:p-12">
    //             You don&apos;t have the permission to edit this gig.
    //         </div>
    //     )

    console.log(gig.title);

    async function handleSendImage(event: FormEvent) {
        event.preventDefault();
        if (gig === undefined) return;

        const nonNullableGig = gig as Doc<"gigs">;

        // Step 1: Get a short-lived upload URL
        const postUrl = await generateUploadUrl();

        // Step 2: POST the file to the URL
        const result = await fetch(postUrl, {
            method: "POST",
            headers: { "Content-Type": selectedImage!.type },
            body: selectedImage,
        });

        const json = await result.json();

        if (!result.ok) {
            throw new Error(`Upload failed: ${JSON.stringify(json)}`);
        }
        const { storageId } = json;
        // Step 3: Save the newly allocated storage id to the database
        await sendImage({ storageId, format: "image", gigId: nonNullableGig._id })
            .catch((error) => {
                console.log(error);
                toast.error("Failed to upload. Maximum 5 files allowed.");
            });

        setSelectedImage(null);
        imageInput.current!.value = "";
    }

    const onDelete = async () => {
        mutate({ id: params.gigId as Id<"gigs"> });
        router.back();
    };


    return (
        <>
            <div className="space-y-8 2xl:px-64 xl:px-36 md:px-12 px-12">
                <div className="flex justify-end pr-2 space-x-2">
                    <Link href={`/gig/${gig._id}`}>
                        <Button disabled={pending} variant={"secondary"}>
                            Preview
                        </Button>
                    </Link>
                    <Button disabled={pending} variant={"secondary"} onClick={onDelete}>
                        Delete
                    </Button>
                </div>

                <TitleEditor
                    id={gig._id}
                    title={gig.title}
                />

                <Images
                    images={gig.images}
                    title={gig.title}
                />

                <form onSubmit={handleSendImage} className="flex space-x-2">
                    <Input
                        type="file"
                        accept="image/*"
                        ref={imageInput}
                        onChange={(event) => setSelectedImage(event.target.files![0])}
                        className="cursor-pointer w-fit bg-zinc-100 text-zinc-700 border-zinc-300 hover:bg-zinc-200 hover:border-zinc-400 focus:border-zinc-400 focus:bg-zinc-200"
                        disabled={selectedImage !== null}
                    />
                    <Button
                        type="submit"
                        disabled={selectedImage === null}
                        className="w-fit"
                    >Upload Image</Button>
                </form>
                asdasd
                <div className="flex rounded-md border border-zinc-300 items-center space-x-4 w-fit p-2 cursor-default">
                    <p className="text-muted-foreground">👨‍🎨 Creator: {"Vuk Rosic"}</p>
                </div>
                {/* <PriceEditor
                    id={gig._id}
                    price={5}
                /> */}
            </div>
            {/* <Description
                id={gig._id}
                initialContent={gig.description}
                editable={true}
                className="pb-40 pt-6 2xl:px-[200px] xl:px-[90px] xs:px-[17px]"
            /> */}
        </>
    )
}

export default Edit;