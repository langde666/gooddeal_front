import { useSelector } from 'react-redux';
import VendorLayout from '../../components/layout/VendorLayout';
import VendorCreateProductForm from '../../components/item/form/VendorCreateProductForm';

const CreateProductPage = (props) => {
    const user = useSelector((state) => state.account.user);
    const store = useSelector((state) => state.vendor.store);

    return (
        <VendorLayout user={user} store={store}>
            <div className="vendor-create-product-page">
                <VendorCreateProductForm storeId={store._id} />
            </div>
        </VendorLayout>
    );
};

export default CreateProductPage;
