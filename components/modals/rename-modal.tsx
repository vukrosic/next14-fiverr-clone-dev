"use client";

import { useRenameModal } from "@/store/use-rename-modal";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";

export const RenameModal = () => {
    const {
        isOpen,
        onClose,
        initialValues
    } = useRenameModal();

    return (
        // <Dialog>
        //     <DialogContent>
        //         <DialogHeader>
        //             <DialogTitle>
        //                 Edit gig title
        //             </DialogTitle>
        //         </DialogHeader>
        //     </DialogContent>
        // </Dialog>
        <div></div>
    );
}