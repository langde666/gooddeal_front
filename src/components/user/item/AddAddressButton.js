import Modal from '../../ui/Modal';
import AddAddressForm from '../form/AddAddressForm';

const AddAddressButton = ({ count = 0 }) => {
    return (
        <div className="add-address-item position-relative d-inline-block">
            <div className="cus-tooltip">
                <button
                    type="button"
                    disabled={count >= 6 ? true : false}
                    className="btn btn-primary ripple"
                    data-bs-toggle="modal"
                    data-bs-target="#add-address-form"
                >
                    <i className="fas fa-plus-circle me-2"></i>New address
                </button>

                {count < 6 &&
                    (<Modal
                        id="add-address-form"
                        hasCloseBtn={false}
                        title="Add new address"
                    >
                        <AddAddressForm />
                    </Modal>)}
            </div>
            {count >= 6 && (
                <small className="cus-tooltip-msg">The limit is 6 addresses</small>
            )}
        </div>
    )
}

export default AddAddressButton;