import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import VendorLayout from '../../components/layout/VendorLayout';
import VendorEditProductForm from '../../components/item/form/VendorEditProductForm';

const EditProductPage = (props) => {
    const user = useSelector((state) => state.account.user);
    const store = useSelector((state) => state.vendor.store);
    const { productId } = useParams();

    return (
        <VendorLayout user={user} store={store}>
            <div className="vendor-edit-product-page">
                <VendorEditProductForm
                    storeId={store._id}
                    productId={productId}
                />
            </div>
        </VendorLayout>
    );
};

export default EditProductPage;
