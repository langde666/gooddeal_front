import { useSelector } from 'react-redux';
import VendorManagerLayour from '../../components/layout/VendorManagerLayour';
import StaffsCollection from '../../components/vendor/table/StaffsCollection';
import StaffCard from '../../components/vendor/item/StaffCard';

const ShopStaffsPage = (props) => {
    const { ownerId } = useSelector(state => state.store.store);
    return (
        <VendorManagerLayour>
            <div className="shop-staffs-manager-page">
                <StaffsCollection />
                <hr />
                <div className="shop-owner-info">
                    <h4 className="mb-3">Shop owner</h4>
                    {ownerId &&
                        <div className="row">
                            <div className="col-3 mb-4">
                                <StaffCard user={ownerId} />
                            </div>
                        </div>}
                </div>
            </div>
        </VendorManagerLayour>
    );

}

export default ShopStaffsPage;