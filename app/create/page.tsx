"use client";

import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import FileUpload from "./_components/file-upload";

const CreatePage = () => {
    const router = useRouter();
    const { mutate, pending } = useApiMutation(api.gig.create);

    const onClick = () => {
        mutate({
            title: "Untitled",
            category: "asdf"
        })
            .then((id) => {
                toast.success("Gig created");
                router.push(`/gig/${id}`);
            })
            .catch(() => toast.error("Failed to create gig"));
    }
    return (
        <div>
            <FileUpload />
        </div>
    );
}

export default CreatePage;