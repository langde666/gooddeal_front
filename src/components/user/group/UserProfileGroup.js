import { Fragment } from 'react';
import Paragraph from "../../ui/Paragraph";
import Modal from '../../ui/Modal';
import EmailActiveItem from '../item/EmailActiveItem';
import PhoneActiveItem from '../item/PhoneActiveItem';
import ProfileEditForm from '../form/ProfileEditForm';

const UserProfileGroup = ({ user = {}, isEditable = false }) => (
    <div className="profile-form row py-2 border border-primary rounded-3">
        <div className="col-6">
            <Paragraph
                label="First name"
                value={user.firstname}
            />
        </div>

        <div className="col-6">
            <Paragraph
                label="Last name"
                value={user.lastname}
            />
        </div>

        {!isEditable ? (
            <div className="col-6">
                <Paragraph
                    label="Email"
                    value={user.email || '-'}
                />
            </div>
        ) : (
            <Fragment>
                <div className="col-6">
                    <Paragraph
                        label="Email"
                        value={user.email || '-'}
                    />
                </div>

                <div className="col-6 mt-2">
                    <EmailActiveItem
                        email={user.email}
                        isEmailActive={user.isEmailActive}
                        googleId={user.googleId}
                        facebookId={user.facebookId}
                    />
                </div>
            </Fragment>
        )}

        {!isEditable ? (
            <div className="col-6">
                <Paragraph
                    label="Phone"
                    value={user.phone || '-'}
                />
            </div>
        ) : (
            <Fragment>
                <div className="col-6">
                    <Paragraph
                        label="Phone"
                        value={user.phone || '-'}
                    />
                </div>

                <div className="col-6 mt-2">
                    <PhoneActiveItem
                        phone={user.phone}
                        isPhoneActive={user.isPhoneActive}
                    />
                </div>
            </Fragment>
        )}

        <div className="col-6">
            <Paragraph
                label="Id card"
                value={user.id_card || '-'}
            />
        </div>

        {isEditable && (
            <div className="col-12 d-flex justify-content-end">
                <div className="position-relative d-inline-block">
                    <button type="button" className="btn btn-primary ripple cus-tooltip"
                        data-bs-toggle="modal"
                        data-bs-target="#profile-edit-form">
                        <i className="fas fa-pen"></i>
                    </button>

                    <Modal
                        id="profile-edit-form"
                        hasCloseBtn={false}
                        title="Edit profile"
                    >
                        <ProfileEditForm
                            firstname={user.firstname}
                            lastname={user.lastname}
                            email={user.email}
                            phone={user.phone}
                            id_card={user.id_card}
                            googleId={user.googleId}
                            facebookId={user.facebookId}
                        />
                    </Modal>

                    <small className="cus-tooltip-msg">Edit Profile</small>
                </div>
            </div>
        )}
    </div>
);

export default UserProfileGroup;