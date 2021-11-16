import Modal from '../ui/Modal';
import AdminCreateStoreLevelForm from './form/AdminCreateStoreLevelForm';

const AdminCreateStoreLevelItem = ({ onRun = () => {} }) => (
    <div className="admin-create-level-item d-inline-block">
        <button
            type="button"
            className="btn btn-primary ripple text-nowrap"
            data-bs-toggle="modal"
            data-bs-target="#admin-create-level-form"
        >
            <i className="fas fa-plus-circle me-2"></i>New level
        </button>

        <Modal
            id="admin-create-level-form"
            hasCloseBtn={false}
            title="Create new level"
        >
            <AdminCreateStoreLevelForm onRun={onRun} />
        </Modal>
    </div>
);

export default AdminCreateStoreLevelItem;