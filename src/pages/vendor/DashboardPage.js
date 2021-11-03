import { useSelector } from 'react-redux';
import VendorLayout from '../../components/layout/VendorLayout';

const DashboardPage = (props) => {
    const user = useSelector((state) => state.account.user);
    const store = useSelector((state) => state.vendor.store);
    return (
        <VendorLayout user={user} store={store}>
            <div className="vendor-dashboard-page">Vendor dashboard...</div>
        </VendorLayout>
    );
};

export default DashboardPage;
