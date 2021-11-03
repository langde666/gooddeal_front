import { useSelector } from 'react-redux';
import VendorLayout from '../../components/layout/VendorLayout';

const OrdersPage = (props) => {
    const user = useSelector((state) => state.account.user);
    const store = useSelector((state) => state.vendor.store);
    return (
        <VendorLayout user={user} store={store}>
            <div className="vendor-orders-manager-page">
                Vendor orders manager...
            </div>
        </VendorLayout>
    );
};

export default OrdersPage;
