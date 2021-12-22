import Modal from '../ui/Modal';
import AdminCreateUserLevelForm from './form/AdminCreateUserLevelForm';

const AdminCreateUserLevelItem = ({ onRun = () => {} }) => (
    <div className="admin-create-level-item d-inline-block">
        <button
            type="button"
            className="btn btn-primary ripple text-nowrap"
            data-bs-toggle="modal"
            data-bs-target="#admin-create-level-form"
        >
            <i className="fas fa-plus-circle"></i>
            <span className="ms-2 res-hide">New level</span>
        </button>

        <Modal
            id="admin-create-level-form"
            hasCloseBtn={false}
            title="Create new level"
        >
            <AdminCreateUserLevelForm onRun={onRun} />
        </Modal>
    </div>
);

export default AdminCreateUserLevelItem;
