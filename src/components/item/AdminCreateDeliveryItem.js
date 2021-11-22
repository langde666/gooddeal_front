import Modal from '../ui/Modal';
import AdminCreateDeliveryForm from './form/AdminCreateDeliveryForm';

const AdminCreateDeliveryItem = ({ onRun = () => {} }) => (
    <div className="admin-create-delivery-item d-inline-block">
        <button
            type="button"
            className="btn btn-primary ripple text-nowrap"
            data-bs-toggle="modal"
            data-bs-target="#admin-create-delivery-form"
        >
            <i className="fas fa-plus-circle me-2"></i>New delivery unit
        </button>

        <Modal
            id="admin-create-delivery-form"
            hasCloseBtn={false}
            title="Create new delivery unit"
        >
            <AdminCreateDeliveryForm onRun={onRun} />
        </Modal>
    </div>
);

export default AdminCreateDeliveryItem;
