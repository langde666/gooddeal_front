import { Fragment } from 'react';
import Paragraph from "../../ui/Paragraph";
import Modal from '../../ui/Modal';
import EmailActiveItem from '../item/EmailActiveItem';
import PhoneActiveItem from '../item/PhoneActiveItem';
import ProfileEditForm from '../form/ProfileEditForm';

const UserProfileGroup = ({
    firstname, lastname, id_card, email, phone, isEmailActive, isPhoneActive, googleId, facebookId, isEditable = false
}) => (
    <div className="profile-form row py-2 border border-primary rounded-3">
        <div className="col-6">
            <Paragraph
                label="First name"
                value={firstname}
            />
        </div>

        <div className="col-6">
            <Paragraph
                label="Last name"
                value={lastname}
            />
        </div>

        <div className="col-6">
            <Paragraph
                label="Id card"
                value={id_card || '-'}
            />
        </div>

        {!isEditable ? (
            <div className="col-6">
                <Paragraph
                    label="Email"
                    value={email || '-'}
                />
            </div>
        ) : (
            <Fragment>
                <div className="col-8">
                    <Paragraph
                        label="Email"
                        value={email || '-'}
                    />
                </div>

                <div className="col-4 mt-2">
                    <EmailActiveItem
                        email={email}
                        isEmailActive={isEmailActive}
                        googleId={googleId}
                        facebookId={facebookId}
                    />
                </div>
            </Fragment>
        )}

        {!isEditable ? (
            <div className="col-6">
                <Paragraph
                    label="Phone"
                    value={phone || '-'}
                />
            </div>
        ) : (
            <Fragment>
                <div className="col-8">
                    <Paragraph
                        label="Phone"
                        value={phone || '-'}
                    />
                </div>

                <div className="col-4 mt-2">
                    <PhoneActiveItem
                        phone={phone}
                        isPhoneActive={isPhoneActive}
                    />
                </div>
            </Fragment>
        )}

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
                            firstname={firstname}
                            lastname={lastname}
                            email={email}
                            phone={phone}
                            id_card={id_card}
                            googleId={googleId}
                            facebookId={facebookId}
                        />
                    </Modal>

                    <small className="cus-tooltip-msg">Edit Profile</small>
                </div>
            </div>
        )}
    </div>
);

export default UserProfileGroup;