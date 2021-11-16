import Modal from '../ui/Modal';
import AddValueStyleForm from './form/AddValueStyleForm';

const AddValueStyleItem = ({ styleId = '', styleName = '', onRun }) => (
    <div className="add-address-item position-relative d-inline-block">
        <button
            type="button"
            className="btn btn-primary ripple text-nowrap"
            data-bs-toggle="modal"
            data-bs-target={`#add-style-value-form-${styleId}`}
        >
            <i className="fas fa-plus-circle me-2"></i>New Value
        </button>

        <Modal
            id={`add-style-value-form-${styleId}`}
            hasCloseBtn={false}
            title={`Add new value for '${styleName}'`}
        >
            <AddValueStyleForm
                styleId={styleId}
                styleName={styleName}
                onRun={onRun}
            />
        </Modal>
    </div>
);

export default AddValueStyleItem;
