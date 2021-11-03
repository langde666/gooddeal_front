import { Fragment } from 'react';
import Paragraph from '../ui/Paragraph';
import PhoneActiveButton from '../button/PhoneActiveButton';
import EmailActiveButton from '../button/EmailActiveButton';
import UserEditProfileItem from '../item/UserEditProfileItem';
import UserEditPasswordItem from '../item/UserEditPasswordItem';

const UserProfileInfo = ({ user = {}, isEditable = false }) => (
    <div className="profile-form row py-2 border border-primary rounded-3">
        <div className="col-6">
            <Paragraph label="First name" value={user.firstname} />
        </div>

        <div className="col-6">
            <Paragraph label="Last name" value={user.lastname} />
        </div>

        {!isEditable ? (
            <div className="col-6">
                <Paragraph label="Email" value={user.email || '-'} />
            </div>
        ) : (
            <Fragment>
                <div className="col-6">
                    <Paragraph label="Email" value={user.email || '-'} />
                </div>

                <div className="col-6 mt-2">
                    <EmailActiveButton
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
                <Paragraph label="Phone" value={user.phone || '-'} />
            </div>
        ) : (
            <Fragment>
                <div className="col-6">
                    <Paragraph label="Phone" value={user.phone || '-'} />
                </div>

                <div className="col-6 mt-2">
                    <PhoneActiveButton
                        phone={user.phone}
                        isPhoneActive={user.isPhoneActive}
                    />
                </div>
            </Fragment>
        )}

        <div className="col-6">
            <Paragraph label="Id card" value={user.id_card || '-'} />
        </div>

        {isEditable && (
            <div className="col-12 d-flex justify-content-end">
                <UserEditProfileItem user={user} />

                {!user.googleId && !user.facebookId && (
                    <div className="ms-1">
                        <UserEditPasswordItem />
                    </div>
                )}
            </div>
        )}
    </div>
);

export default UserProfileInfo;
