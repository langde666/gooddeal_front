import Modal from '../ui/Modal';
import StoreAddStaffForm from './form/StoreAddStaffForm';

const StoreAddStaffItem = ({ storeId = '', owner = {}, staffs = [] }) => (
    <div className="add-staff-item d-inline-block">
        <button
            type="button"
            className="btn btn-primary ripple text-nowrap"
            data-bs-toggle="modal"
            data-bs-target="#add-staff-form"
        >
            <i className="fas fa-plus-circle me-2"></i>Add Staff
        </button>

        <Modal id="add-staff-form" hasCloseBtn={false} title="Add new staff">
            <StoreAddStaffForm
                storeId={storeId}
                owner={owner}
                staffs={staffs}
            />
        </Modal>
    </div>
);

export default StoreAddStaffItem;
