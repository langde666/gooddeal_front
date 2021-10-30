import Paragraph from "../../ui/Paragraph";
import Modal from '../../ui/Modal';
import ProfileEditForm from '../../vendor/form/ProfileEditForm';

const StoreProfileGroup = ({ store = {}, isEditable = false }) => (
    <div className="profile-form row py-2 border border-primary rounded-3">
        <div className="col-12">
            <Paragraph
                label="Name"
                value={store.name}
            />
        </div>

        <div className="col-12">
            <Paragraph
                label="Bio"
                value={store.bio}
                multiLine={true}
            />
        </div>

        {isEditable && (
            <div className="col-12 d-flex justify-content-end">
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
                        <ProfileEditForm
                            storeId={store._id}
                            name={store.name}
                            bio={store.bio}
                        />
                    </Modal>

                    <small className="cus-tooltip-msg">Edit Shop Profile</small>
                </div>
            </div>
        )}
    </div>
);

export default StoreProfileGroup;