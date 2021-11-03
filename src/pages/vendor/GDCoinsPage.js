import { useSelector } from 'react-redux';
import VendorLayout from '../../components/layout/VendorLayout';

const GDCoinsPage = (props) => {
    const user = useSelector((state) => state.account.user);
    const store = useSelector((state) => state.vendor.store);
    return (
        <VendorLayout user={user} store={store}>
            <div className="vendor-GDCoins-manager-page">
                Vendor GDCoins manager...
            </div>
        </VendorLayout>
    );
};

export default GDCoinsPage;
