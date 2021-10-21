import Modal from '../../ui/Modal';
import AddStaffsForm from '../form/AddStaffsForm';

const AddStaffsButton = ({ storeId, ownerId, staffIds }) => (
    <div className="add-staffs-item">
        <button
            type="button"
            className="btn btn-primary ripple"
            data-bs-toggle="modal"
            data-bs-target="#add-staffs-form"
        >
            <i className="fas fa-plus-circle me-2"></i>New Staffs
        </button>

        <Modal
            id="add-staffs-form"
            hasCloseBtn={false}
            title="Add new staffs"
        >
            <AddStaffsForm storeId={storeId} ownerId={ownerId} staffIds={staffIds} />
        </Modal>
    </div>
);

export default AddStaffsButton;