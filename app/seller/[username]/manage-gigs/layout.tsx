import { Separator } from "@/components/ui/separator"
import { Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
    title: "Forms",
    description: "Advanced form example using react-hook-form and Zod.",
}

const sidebarNavItems = [
    {
        title: "Profile",
        href: "/examples/forms",
    },
    {
        title: "Account",
        href: "/examples/forms/account",
    },
    {
        title: "Appearance",
        href: "/examples/forms/appearance",
    },
    {
        title: "Notifications",
        href: "/examples/forms/notifications",
    },
    {
        title: "Display",
        href: "/examples/forms/display",
    },
]

interface SettingsLayoutProps {
    children: React.ReactNode
}

export default function ManageGigsLayout({ children }: SettingsLayoutProps) {
    return (
        <div className="block space-y-6 pb-16 pt-32 p-12">
            {children}
        </div>
    )
}
