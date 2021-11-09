import { useSelector } from 'react-redux';
import useToggle from '../../hooks/useToggle';
import VendorLayout from '../../components/layout/VendorLayout';
import StoreOwnerTable from '../../components/table/StoreOwnerTable';
import StoreStaffsTable from '../../components/table/StoreStaffsTable';

const StaffsPage = (props) => {
    const user = useSelector((state) => state.account.user);
    const store = useSelector((state) => state.vendor.store);
    const [flag, toggleFlag] = useToggle(true);

    return (
        <VendorLayout user={user} store={store}>
            <div className="vendor-staffs-manager-page">
                <div className="d-flex align-items-center my-2">
                    <div className="position-relative d-inline-block me-2">
                        <button
                            type="button"
                            className={`btn ${
                                flag ? 'btn-primary' : 'btn-outline-primary'
                            } btn-lg ripple cus-tooltip`}
                            onClick={() => toggleFlag(true)}
                        >
                            <i className="fas fa-user-friends"></i>
                        </button>

                        <small className="cus-tooltip-msg">Shop staffs</small>
                    </div>

                    <div className="position-relative d-inline-block">
                        <button
                            type="button"
                            className={`btn ${
                                !flag ? 'btn-primary' : 'btn-outline-primary'
                            } btn-lg ripple cus-tooltip`}
                            onClick={() => toggleFlag(false)}
                        >
                            <i className="fas fa-user-shield"></i>
                        </button>

                        <small className="cus-tooltip-msg">Shop owner</small>
                    </div>
                </div>

                {flag ? <StoreStaffsTable /> : <StoreOwnerTable />}
            </div>
        </VendorLayout>
    );
};

export default StaffsPage;
