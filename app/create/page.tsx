"use client";

import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
// import FileUpload from "./_components/file-upload";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const CreatePage = () => {
    const router = useRouter();
    const { mutate, pending } = useApiMutation(api.gig.create);
    const [title, setTitle] = useState("Untitled");
    const [category, setCategory] = useState("asdf");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0);
    const [ownerId, setOwnerId] = useState("");
    const [ownerName, setOwnerName] = useState("");

    const onClick = () => {
        mutate({
            title,
            category,
            description,
            price,
            ownerId,
            ownerName,
        })
            .then((id) => {
                toast.success("Gig created");
                router.push(`/gig/${id}`);
            })
            .catch(() => toast.error("Failed to create gig"));
    }
    return (
        <div>
            {/* <FileUpload /> */}
            <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <Input placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
            <Input placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
            <Input placeholder="Price" value={price} onChange={(e) => setPrice(5)} />
            <Input placeholder="OwnerId" value={ownerId} onChange={(e) => setOwnerId(e.target.value)} />
            <Input placeholder="OwnerName" value={ownerName} onChange={(e) => setOwnerName(e.target.value)} />
            <button onClick={onClick} disabled={pending}>Create</button>
        </div>
    );
}

export default CreatePage;