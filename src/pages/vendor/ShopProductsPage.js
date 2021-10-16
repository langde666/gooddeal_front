import { useSelector } from 'react-redux';
import VendorManagerLayour from '../../components/layout/VendorManagerLayour';

const ShopProductsPage = (props) => {
    const store = useSelector(state => state.store.store);

    return (
        <VendorManagerLayour>
            <div className="shop-products-manager-page">
                Shop products manager...
            </div>
        </VendorManagerLayour>
    );

}

export default ShopProductsPage;