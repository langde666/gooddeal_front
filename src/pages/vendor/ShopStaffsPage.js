import { useSelector } from 'react-redux';
import VendorManagerLayour from '../../components/layout/VendorManagerLayour';

const ShopStaffsPage = (props) => {
    const store = useSelector(state => state.store.store);

    return (
        <VendorManagerLayour>
            <div className="shop-staffs-manager-page">
                Shop Staffs manager...
            </div>
        </VendorManagerLayour>
    );

}

export default ShopStaffsPage;