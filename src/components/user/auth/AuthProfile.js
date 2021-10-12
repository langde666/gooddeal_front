import { useState } from 'react';
import { useSelector } from "react-redux";
import { getToken } from '../../../apis/auth';
import { sendConfirmationEmail } from '../../../apis/user';
import Modal from '../../ui/Modal';
import Input from "../../ui/Input";
import ProfileEditForm from '../form/ProfileEditForm';
import PasswordEditForm from '../form/PasswordEditForm';
import Loading from '../../ui/Loading';
import Error from '../../ui/Error';
import Success from '../../ui/Success';

const AuthProfile = (props) => {
    const { firstname, lastname, email, phone, id_card, isEmailActive, isPhoneActive, googleId, facebookId } = useSelector(state => state.user.user);

    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSendEmail = () => {
        setError('');
        setSuccess('');
        setIsLoading(true);

        const { _id, accessToken } = getToken();

        sendConfirmationEmail(_id, accessToken)
            .then(data => {
                if (data.error) {
                    setError(data.error);
                    setIsLoading(false);
                    setTimeout(() => {
                        setError('');
                    }, 3000);
                }
                else {
                    setSuccess(data.success);
                    setIsLoading(false);
                    setTimeout(() => {
                        setSuccess('');
                    }, 3000);
                }
            })
            .catch(error => {
                setError('Error server');
                setIsLoading(false);
                setTimeout(() => {
                    setError('');
                }, 3000);
            });
    }

    return (
        <div className="profile-form row py-2 border border-primary rounded-3">
            <div className="col-6">
                <Input
                    type="text"
                    label="First name"
                    value={firstname}
                    isDisabled={true}
                />
            </div>

            <div className="col-6">
                <Input
                    type="text"
                    label="Last name"
                    value={lastname}
                    isDisabled={true}
                />
            </div>

            <div className="col-8">
                <Input
                    type="text"
                    label="Email"
                    value={email || '-'}
                    isDisabled={true}
                />
            </div>

            <div className="col-4 mt-2">
                {email && isEmailActive &&
                    (
                        <div className="position-relative d-inline-block">
                            <span className='badge bg-primary cus-tooltip'>
                                <i className="fas fa-check-circle me-2"></i>
                                verified
                            </span>
                            <small className="cus-tooltip-msg">Email Verified</small>
                        </div>

                    )}

                {(googleId || facebookId) &&
                    (
                        <div className="position-relative d-inline-block">
                            <span className='badge bg-primary d-inline-flex align-items-end cus-tooltip cus-tooltip'>
                                {googleId && <img
                                    className="social-img rounded-circle me-1 social-img--small"
                                    src="https://img.icons8.com/color/48/000000/google-logo.png"
                                />}
                                {facebookId && <img
                                    className="social-img rounded-circle me-1 social-img--small"
                                    src="https://img.icons8.com/color/48/000000/facebook-new.png"
                                />}
                                linked
                            </span>
                            <small className="cus-tooltip-msg">Linked email is non editable</small>
                        </div>
                    )}

                {email && !isEmailActive &&
                    (
                        <div className="position-relative d-inline-block">
                            {isloading && <Loading size="small" />}
                            <button className='btn btn-warning btn-sm text-white cus-tooltip ripple'
                                onClick={handleSendEmail}
                            >
                                <i className="fas fa-paper-plane me-2"></i>
                                verify now!
                            </button>
                            <small className="cus-tooltip-msg">Click to send confirmation email</small>
                            {error && <span><Error msg={error} /></span>}
                            {success && <span className="text-nowrap"><Success msg={success} /></span>}
                        </div>
                    )}
            </div>

            <div className="col-8">
                <Input
                    type="text"
                    label="Phone"
                    value={phone || '-'}
                    isDisabled={true}
                />
            </div>

            <div className="col-4 mt-2">
                {phone && isPhoneActive &&
                    (
                        <div className="position-relative d-inline-block">
                            <span className='badge bg-primary cus-tooltip'>
                                <i className="fas fa-check-circle me-2"></i>
                                verified
                            </span>
                            <small className="cus-tooltip-msg">Phone number Verified</small>
                        </div>
                    )}

                {phone && !isPhoneActive &&
                    (
                        <div className="position-relative d-inline-block">
                            <div className="temp cus-tooltip">
                                <button disabled className='btn btn-warning btn-sm text-white cus-tooltip ripple'
                                    onClick={() => { }}
                                >
                                    <i className="fas fa-sms me-2"></i>
                                    verify now!
                                </button>
                                <small className="cus-tooltip-msg">Click to send confirmation sms</small>
                            </div>
                            <small className="cus-tooltip-msg">This function is not available yet</small>
                        </div>
                    )}
            </div>

            <div className="col-12">
                <Input
                    type="text"
                    label="Id card"
                    value={id_card || '-'}
                    isDisabled={true}
                />
            </div>

            {
                (!googleId && !facebookId) && <div className="col-12">
                    <Input
                        type="text"
                        label="Password"
                        value='-'
                        isDisabled={true}
                    />
                </div>
            }

            <div className="col-12 d-flex justify-content-end">
                <div className="position-relative d-inline-block">
                    <button type="button" className="btn btn-primary ripple cus-tooltip px-4"
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

                {!googleId && !facebookId && <div className="position-relative d-inline-block ms-2">
                    <button type="button" className="btn btn-primary ripple cus-tooltip px-4"
                        data-bs-toggle="modal"
                        data-bs-target="#password-edit-form">
                        <i className="fas fa-key"></i>
                    </button>

                    <Modal
                        id="password-edit-form"
                        hasCloseBtn={false}
                        title="Change password"
                    >
                        <PasswordEditForm />
                    </Modal>

                    <small className="cus-tooltip-msg">Change Password</small>
                </div>}
            </div>
        </div>
    );
}

export default AuthProfile;