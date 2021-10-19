import Modal from '../../ui/Modal';
import CreateShopForm from '../form/CreateShopForm';

const CreateShopButton = (props) => (
    <div className="create-shop-item position-relative d-inline-block">
        <button
            type="button"
            className="btn btn-primary ripple"
            data-bs-toggle="modal"
            data-bs-target="#create-shop-form"
        >
            <i className="fas fa-plus-circle me-2"></i>New shop
        </button>

        <Modal
            id="create-shop-form"
            hasCloseBtn={false}
            subTitle="Creat a shop! Being a GoodDeal business is easy."
        >
            <CreateShopForm />
        </Modal>
    </div>
);

export default CreateShopButton;