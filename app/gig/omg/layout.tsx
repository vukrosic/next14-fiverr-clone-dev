import { Sidebar } from "../../(dashboard)/_components/sidebar";
import Navbar from "./_components/navbar";

interface DashboardLayoutProps {
    children: React.ReactNode;
    params: {
        gigId: string;
    };
}

const GigLayout = ({ children, params }: DashboardLayoutProps) => {
    return (
        <main className="h-full">
            <Sidebar />
            <div className="lg:pl-[300px] h-full">
                <Navbar gigId={params.gigId} />
                {children}
            </div>
        </main>
    );
}

export default GigLayout;