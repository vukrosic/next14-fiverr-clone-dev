import Navbar from "@/app/(dashboard)/_components/navbar";


interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    return (
        <main className="h-full  px-0 2xl:px-56">
            <Navbar />
            {children}
        </main>
    );
}

export default DashboardLayout;