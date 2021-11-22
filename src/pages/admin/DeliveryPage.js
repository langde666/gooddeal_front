import { useSelector } from 'react-redux';
import AdminLayout from '../../components/layout/AdminLayout';
import AdminDeliveriesTable from '../../components/table/AdminDeliveriesTable';

const DeliveryPage = (props) => {
    const user = useSelector((state) => state.account.user);
    return (
        <AdminLayout user={user}>
            <div className="admin-deliveries-manager-page">
                <AdminDeliveriesTable />
            </div>
        </AdminLayout>
    );
};

export default DeliveryPage;
