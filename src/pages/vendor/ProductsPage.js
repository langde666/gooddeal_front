import { useSelector } from 'react-redux';
import VendorLayout from '../../components/layout/VendorLayout';

const ProductsPage = (props) => {
    const user = useSelector((state) => state.account.user);
    const store = useSelector((state) => state.vendor.store);
    return (
        <VendorLayout user={user} store={store}>
            <div className="vendor-products-manager-page">
                Vendor products manager...
            </div>
        </VendorLayout>
    );
};

export default ProductsPage;
