import Modal from '../ui/Modal';
import VendorAddProductImageForm from './form/VendorAddProductImageForm';

const VendorAddProductImagesItem = ({
    count = 6,
    productId = '',
    storeId = '',
    onRun,
}) => (
    <div className="position-relative d-inline-block">
        <div className="cus-tooltip">
            <button
                type="button"
                disabled={count >= 6 ? true : false}
                className="btn btn-primary ripple text-nowrap"
                data-bs-toggle="modal"
                data-bs-target="#add-product-image-form"
            >
                <i className="fas fa-plus-circle"></i>
                <span className="res-hide ms-2">Add image</span>
            </button>

            {count < 6 && (
                <Modal
                    id="add-product-image-form"
                    hasCloseBtn={false}
                    title="Add new product image"
                >
                    <VendorAddProductImageForm
                        storeId={storeId}
                        productId={productId}
                        onRun={onRun}
                    />
                </Modal>
            )}
        </div>
        {count >= 6 && (
            <small className="cus-tooltip-msg">The limit is 5 images</small>
        )}
    </div>
);

export default VendorAddProductImagesItem;
