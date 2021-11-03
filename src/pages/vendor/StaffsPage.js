import { useSelector } from 'react-redux';
import VendorLayout from '../../components/layout/VendorLayout';
import StoreOwnerTable from '../../components/table/StoreOwnerTable';
import StoreStaffsTable from '../../components/table/StoreStaffsTable';

const StaffsPage = (props) => {
    const user = useSelector((state) => state.account.user);
    const store = useSelector((state) => state.vendor.store);
    return (
        <VendorLayout user={user} store={store}>
            <div className="vendor-staffs-manager-page">
                <div className="mb-5">
                    <StoreOwnerTable />
                </div>

                <StoreStaffsTable />
            </div>
        </VendorLayout>
    );
};

export default StaffsPage;
