import { useSelector } from 'react-redux';
import VendorManagerLayour from '../../components/layout/VendorManagerLayour';
import AddStaffsButton from '../../components/vendor/item/AddStaffsButton';
import CancelStaffButton from '../../components/vendor/item/CancelStaffButton';
import StaffsCollection from '../../components/vendor/table/StaffsCollection';
import StaffCard from '../../components/vendor/item/StaffCard';

const ShopStaffsPage = (props) => {
    const store = useSelector(state => state.store.store);
    const { _id: userId } = useSelector(state => state.user.user);

    return (
        <VendorManagerLayour>
            <div className="shop-staffs-manager-page">
                <div className="user-shop-manager-page">

                    <div className="mt-4">
                        {store.ownerId && userId === store.ownerId._id ? (
                            <AddStaffsButton storeId={store._id} ownerId={store.ownerId} staffIds={store.staffIds} />
                        ) : (
                            <CancelStaffButton storeId={store._id} />
                        )}
                    </div>

                    <div className="mt-4">
                        <StaffsCollection />
                    </div>

                    <hr />
                    <div className="row">
                        <h4 className='mb-3'>Shop owner</h4>
                        <div className="col-3">
                            {store && store.ownerId && <StaffCard user={store.ownerId} />}
                        </div>
                    </div>
                </div>
            </div>
        </VendorManagerLayour>
    );

}

export default ShopStaffsPage;