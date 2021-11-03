import Modal from '../ui/Modal';
import UserCreateShopForm from './form/UserCreateShopForm';

const UserCreateShopItem = (props) => (
    <div className="add-address-item d-inline-block">
        <button
            type="button"
            className="btn btn-primary ripple text-nowrap"
            data-bs-toggle="modal"
            data-bs-target="#create-shop-form"
        >
            <i className="fas fa-plus-circle me-2"></i>New shop
        </button>

        <Modal
            id="create-shop-form"
            hasCloseBtn={false}
            title="Create new shop"
        >
            <UserCreateShopForm />
        </Modal>
    </div>
);

export default UserCreateShopItem;
