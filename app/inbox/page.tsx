import Image from "next/image";
import { EmptyFavorites } from "../(dashboard)/_components/empty-favorites";

const InboxPage = () => {
    return (
        <div className="h-full flex flex-col items-center justify-center">
            <Image
                src="/empty-inbox.svg"
                alt="Empty"
                width={340}
                height={340}
            />
            <h2 className="text-2xl font-semibold mt-6 text-black">
                Welcome to inbox!
            </h2>
            <p className="text-muted-foreground text-sm mt-2">
                Select a conversation or start a new one!
            </p>
        </div>
    );
};

export default InboxPage;