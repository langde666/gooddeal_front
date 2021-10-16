import { useSelector } from 'react-redux';
import VendorManagerLayour from '../../components/layout/VendorManagerLayour';

const ShopGDCoinsPage = (props) => {
    const store = useSelector(state => state.store.store);

    return (
        <VendorManagerLayour>
            <div className="shop-GDCoins-manager-page">
                Shop GDCoins manager...
            </div>
        </VendorManagerLayour>
    );

}

export default ShopGDCoinsPage;