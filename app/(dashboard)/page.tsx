import { GigList } from "./_components/gig-list";

interface DashboardProps {
    searchParams: {
        search?: string;
        favorites?: string;
    };
};

const Dashboard = ({
    searchParams
}:DashboardProps) => {
    return ( 
        <GigList
        query={searchParams}
        />
     );
}
 
export default Dashboard;