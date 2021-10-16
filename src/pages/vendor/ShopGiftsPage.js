import { useSelector } from 'react-redux';
import VendorManagerLayour from '../../components/layout/VendorManagerLayour';

const ShopGiftsPage = (props) => {
    const store = useSelector(state => state.store.store);

    return (
        <VendorManagerLayour>
            <div className="shop-gifts-manager-page">
                Shop Gifts manager...
            </div>
        </VendorManagerLayour>
    );

}

export default ShopGiftsPage;