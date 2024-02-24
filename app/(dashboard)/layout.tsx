import Navbar from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";

interface DashboardLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    return (
        <main className="h-full  px-0 2xl:px-56">
            {/* <Sidebar /> */}
            {/* <div className="lg:pl-[300px] h-full"> */}
            <Navbar />
            {children}
            {/* </div> */}
        </main>
    );
}

export default DashboardLayout;