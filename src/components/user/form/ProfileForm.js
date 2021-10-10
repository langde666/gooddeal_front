import { useSelector } from "react-redux";
import Modal from '../../ui/Modal';
import Input from "../../ui/Input";

const ProfileForm = (props) => {
    const { firstname, lastname, email, phone, id_card, isEmailActive, isPhoneActive, googleId, facebookId } = useSelector(state => state.user.user);

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
                    <span className='badge bg-primary'>
                        <i className="fas fa-check-circle me-2"></i>
                        verified
                    </span>}

                {(googleId || facebookId) &&
                    <span className='badge bg-primary'>
                        {googleId && <img
                            className="social-img rounded-circle me-1 social-img--small"
                            src="https://img.icons8.com/color/48/000000/google-logo.png"
                        />}
                        {facebookId && <img
                            className="social-img rounded-circle me-1 social-img--small"
                            src="https://img.icons8.com/color/48/000000/facebook-new.png"
                        />}
                        non-editable
                    </span>}


                {email && !isEmailActive &&
                    <span className='badge bg-danger'>
                        <i className="fas fa-times-circle me-2"></i>
                        not verified
                    </span>}
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
                    <span className='badge bg-primary' >
                        <i className="fas fa-check-circle me-2"></i>
                        verified
                    </span>}

                {phone && !isPhoneActive &&
                    <span className='badge bg-danger' >
                        <i className="fas fa-times-circle me-2"></i>
                        not verified
                    </span>}
            </div>

            <div className="col-12">
                <Input
                    type="text"
                    label="Id card"
                    value={id_card || '-'}
                    isDisabled={true}
                />
            </div>

            {(!googleId && !facebookId) && <div className="col-12">
                <Input
                    type="text"
                    label="Password"
                    value='-'
                    isDisabled={true}
                />
            </div>}

            <div className="col-12 ms-2">
                <div className="position-relative d-inline-block">
                    <button type="button" className="btn btn-primary ripple cus-tooltip"
                        data-bs-toggle="modal"
                        data-bs-target="#profile-edit-form">
                        <i className="fas fa-pen"></i>
                    </button>

                    <Modal
                        id="profile-edit-form"
                        hasCloseBtn={false}
                        title="Edit Profile"
                    >
                        {<div>Edit form</div>}
                    </Modal>

                    <small className="cus-tooltip-msg">Edit Profile</small>
                </div>
            </div>
        </div>
    );
}

export default ProfileForm;