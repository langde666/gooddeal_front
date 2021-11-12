import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import VendorLayout from '../../components/layout/VendorLayout';
import StyleValuesTable from '../../components/table/StyleValuesTable';

const StyleValuesPage = (props) => {
    const user = useSelector((state) => state.account.user);
    const store = useSelector((state) => state.vendor.store);

    const { styleId, storeId } = useParams();
    return (
        <VendorLayout user={user} store={store}>
            <div className="vendor-style-values-manager-page">
                <StyleValuesTable styleId={styleId} isActive={true} />

                <div className="mt-4">
                    <Link
                        to={`/vendor/product/createNewProduct/${storeId}`}
                        className="text-decoration-none cus-link-hover"
                    >
                        <i className="fas fa-arrow-circle-left"></i> Back to
                        Create new product
                    </Link>
                </div>
            </div>
        </VendorLayout>
    );
};

export default StyleValuesPage;
