import { SignIn } from "@clerk/nextjs";

export default function Page() {
    return <div className="bg-red-800">
        <SignIn />
    </div>;
}