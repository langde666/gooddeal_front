import { useSelector } from 'react-redux';
import VendorLayout from '../../components/layout/VendorLayout';
import StaffsCollection from '../../components/vendor/table/StaffsCollection';
import StaffCard from '../../components/vendor/item/StaffCard';

const StaffsPage = (props) => {
    const { ownerId } = useSelector(state => state.vendor.store);
    return (
        <VendorLayout>
            <div className="vendor-staffs-manager-page">
                <StaffsCollection />
                <hr />
                <div className="vendor-owner-info">
                    <h4 className="mb-3">Shop owner</h4>
                    {ownerId &&
                        <div className="row">
                            <div className="col-3 mb-4">
                                <StaffCard user={ownerId} />
                            </div>
                        </div>}
                </div>
            </div>
        </VendorLayout>
    );

}

export default StaffsPage;