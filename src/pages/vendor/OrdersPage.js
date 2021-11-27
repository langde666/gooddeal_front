import { useSelector } from 'react-redux';
import VendorLayout from '../../components/layout/VendorLayout';
import VendorOrdersTable from '../../components/table/VendorOrdersTable';

const OrdersPage = (props) => {
    const user = useSelector((state) => state.account.user);
    const store = useSelector((state) => state.vendor.store);
    return (
        <VendorLayout user={user} store={store}>
            <div className="vendor-orders-manager-page mt-2">
                <VendorOrdersTable heading={false} storeId={store._id} />
            </div>
        </VendorLayout>
    );
};

export default OrdersPage;
