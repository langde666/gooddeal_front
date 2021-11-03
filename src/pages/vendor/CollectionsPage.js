import { useSelector } from 'react-redux';
import VendorLayout from '../../components/layout/VendorLayout';

const CollectionsPage = (props) => {
    const user = useSelector((state) => state.account.user);
    const store = useSelector((state) => state.vendor.store);
    return (
        <VendorLayout user={user} store={store}>
            <div className="vendor-collections-page">Vendor collections...</div>
        </VendorLayout>
    );
};

export default CollectionsPage;
