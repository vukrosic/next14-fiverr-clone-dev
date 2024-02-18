import { Separator } from "@/components/ui/separator";
import { OverviewForm } from "./overview-form";

export default function SettingsProfilePage() {
    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-lg font-medium">Gig overview</h3>
                <p className="text-sm text-muted-foreground">
                    Basic data for your gig.
                </p>
            </div>
            <Separator />
            <OverviewForm />
        </div>
    )
}
