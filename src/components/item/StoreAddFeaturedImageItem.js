import Modal from '../ui/Modal';
import StoreAddFeaturedImageForm from './form/StoreAddFeaturedImageForm';

const StoreAddFeaturedImageItem = ({ count = 6, storeId = '' }) => (
    <div className="add-featured-image-item position-relative d-inline-block">
        <div className="cus-tooltip">
            <button
                type="button"
                disabled={count >= 6 ? true : false}
                className="btn btn-primary ripple text-nowrap btn-sm"
                data-bs-toggle="modal"
                data-bs-target="#add-featured-image-form"
            >
                <i className="fas fa-plus-circle me-2"></i>New Featured Image
            </button>

            {count < 6 && (
                <Modal
                    id="add-featured-image-form"
                    hasCloseBtn={false}
                    title="Add new featured image"
                >
                    <StoreAddFeaturedImageForm storeId={storeId} />
                </Modal>
            )}
        </div>
        {count >= 6 && (
            <small className="cus-tooltip-msg">
                The limit is 6 featured images
            </small>
        )}
    </div>
);

export default StoreAddFeaturedImageItem;