import Modal from '../ui/Modal';
import StoreEditProfileForm from './form/StoreProfileEditForm';

const StoreEditProfileItem = ({ store = {} }) => (
    <div className="position-relative d-inline-block">
        <button type="button" className="btn btn-primary ripple cus-tooltip"
            data-bs-toggle="modal"
            data-bs-target="#shop-profile-edit-form">
            <i className="fas fa-pen"></i>
        </button>

        <Modal
            id="shop-profile-edit-form"
            hasCloseBtn={false}
            title="Edit Shop profile"
        >
            <StoreEditProfileForm
                storeId={store._id}
                name={store.name}
                bio={store.bio}
            />
        </Modal>

        <small className="cus-tooltip-msg">Edit Shop Profile</small>
    </div>
)

export default StoreEditProfileItem;