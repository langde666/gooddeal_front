import { useSelector } from 'react-redux';
import AdminLayout from '../../components/layout/AdminLayout';

const DashboardPage = (props) => {
    const user = useSelector((state) => state.account.user);
    return (
        <AdminLayout user={user}>
            <div className="admin-dashboard-page">Admin dashboard...</div>
        </AdminLayout>
    );
};

export default DashboardPage;
