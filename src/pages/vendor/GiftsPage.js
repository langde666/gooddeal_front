import { useSelector } from 'react-redux';
import VendorLayout from '../../components/layout/VendorLayout';

const GiftsPage = (props) => {
    const user = useSelector((state) => state.account.user);
    const store = useSelector((state) => state.vendor.store);
    return (
        <VendorLayout user={user} store={store}>
            <div className="vendor-gifts-manager-page">
                Vendor Gifts manager...
            </div>
        </VendorLayout>
    );
};

export default GiftsPage;
