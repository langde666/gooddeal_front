import { useSelector } from 'react-redux';
import AdminLayout from '../../components/layout/AdminLayout';
import AdminCommissionsTable from '../../components/table/AdminCommissionsTable';

const CommissionPage = (props) => {
    const user = useSelector((state) => state.account.user);
    return (
        <AdminLayout user={user}>
            <div className="admin-commissions-manager-page">
                <AdminCommissionsTable />
            </div>
        </AdminLayout>
    );
};

export default CommissionPage;