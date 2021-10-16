import { useSelector } from 'react-redux';
import VendorManagerLayour from '../../components/layout/VendorManagerLayour';

const ShopOrdersPage = (props) => {
    const store = useSelector(state => state.store.store);

    return (
        <VendorManagerLayour>
            <div className="shop-orders-manager-page">
                Shop orders manager...
            </div>
        </VendorManagerLayour>
    );

}

export default ShopOrdersPage;