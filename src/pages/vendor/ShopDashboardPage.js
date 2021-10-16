import { useSelector } from 'react-redux';
import VendorManagerLayour from '../../components/layout/VendorManagerLayour';

const ShopDashboardPage = (props) => {
    const store = useSelector(state => state.store.store);

    return (
        <VendorManagerLayour>
            <div className="shop-dashboard-page">
                Shop dashboard...
            </div>
        </VendorManagerLayour>
    );

}

export default ShopDashboardPage;