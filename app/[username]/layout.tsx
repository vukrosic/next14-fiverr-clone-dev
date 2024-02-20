interface UserGigLayoutProps {
    children: React.ReactNode;
}

const DashboardLayout = ({ children }: UserGigLayoutProps) => {
    return (
        <main className="p-0 sm:p-6 md:p-16 lg:px-64">
            {children}
        </main>
    );
}

export default DashboardLayout;