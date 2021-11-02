import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addAccount } from '../../../actions/account';
import { getToken } from '../../../apis/auth';
import { updateProfile } from '../../../apis/user';
import Input from '../../ui/Input';
import Loading from '../../ui/Loading';
import Error from '../../ui/Error';
import Success from '../../ui/Success';
import ConfirmDialog from '../../ui/ConfirmDialog';

const UserEditProfileForm = ({ firstname = '', lastname = '', email = '', phone = '', id_card = '', googleId = false, facebookId = false }) => {
    const [isloading, setIsLoading] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [profile, setProfile] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        setProfile({
            firstname: firstname,
            lastname: lastname,
            email: email || '',
            phone: phone || '',
            id_card: id_card || '',
            isValidFirstname: true,
            isValidLastname: true,
            isValidEmail: true,
            isValidPhone: true,
            isValidIdCard: true,
        })
    }, [firstname, lastname, email, phone, id_card])

    const handleChange = (name, isValidName, value) => {
        setProfile({
            ...profile,
            [name]: value,
            [isValidName]: true,
        });
    };

    const handleValidate = (isValidName, flag) => {
        switch (isValidName) {
            case 'isValidEmail': {
                setProfile({
                    ...profile,
                    [isValidName]: flag || (!email && profile.email == ''),
                });
                return;
            }
            case 'isValidPhone': {
                setProfile({
                    ...profile,
                    [isValidName]: flag || (!phone && profile.phone == ''),
                });
                return;
            }
            case 'isValidIdCard': {
                setProfile({
                    ...profile,
                    [isValidName]: flag || (!id_card && profile.id_card == ''),
                });
                return;
            }

            default: {
                setProfile({
                    ...profile,
                    [isValidName]: flag,
                });
                return;
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!profile.isValidFirstname ||
            !profile.isValidLastname ||
            !profile.isValidEmail ||
            !profile.isValidPhone ||
            !profile.isValidIdCard) return;

        setIsConfirming(true);
    }

    const onSubmit = () => {
        let user = { firstname: profile.firstname, lastname: profile.lastname }
        if (!googleId && !facebookId && profile.email) user.email = profile.email;
        if (profile.phone) user.phone = profile.phone;
        if (profile.id_card) user.id_card = profile.id_card;

        const { _id, accessToken } = getToken();

        setError('');
        setSuccess('');
        setIsLoading(true);
        updateProfile(_id, accessToken, user)
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
                    dispatch(addAccount(data.user));
                    setIsLoading(false);
                    setTimeout(() => {
                        setSuccess('');
                    }, 3000);
                }
            })
            .catch(error => {
                setError('Server error');
                setIsLoading(false);
                setTimeout(() => {
                    setError('');
                }, 3000);
            });
    }

    return (
        <div className="profile-edit-form-wrap position-relative">
            {isloading && <Loading />}

            {isConfirming && <ConfirmDialog
                title='Edit profile'
                onSubmit={onSubmit}
                onClose={() => setIsConfirming(false)}
            />}

            <form className="profile-edit-form row mb-2" onSubmit={handleSubmit}>
                <div className="col-6">
                    <Input
                        type="text"
                        label="First name"
                        value={profile.firstname}
                        isValid={profile.isValidFirstname}
                        feedback="Please provide a valid firstname."
                        validator="name"
                        onChange={(value) => handleChange('firstname', 'isValidFirstname', value)}
                        onValidate={(flag) => handleValidate('isValidFirstname', flag)}
                    />
                </div>

                <div className="col-6">
                    <Input
                        type="text"
                        label="Last name"
                        value={profile.lastname}
                        isValid={profile.isValidLastname}
                        feedback="Please provide a valid lastname."
                        validator="name"
                        onChange={(value) => handleChange('lastname', 'isValidLastname', value)}
                        onValidate={(flag) => handleValidate('isValidLastname', flag)}
                    />
                </div>

                {(!googleId && !facebookId) && <div className="col-12">
                    <Input
                        type="text"
                        label="Email address"
                        value={profile.email}
                        isValid={profile.isValidEmail}
                        feedback="Please provide a valid email address."
                        validator="email"
                        onChange={(value) => handleChange('email', 'isValidEmail', value)}
                        onValidate={(flag) => handleValidate('isValidEmail', flag)}
                    />
                </div>}

                <div className="col-12">
                    <Input
                        type="text"
                        label="Phone number"
                        value={profile.phone}
                        isValid={profile.isValidPhone}
                        feedback="Please provide a valid phone number."
                        validator="phone"
                        onChange={(value) => handleChange('phone', 'isValidPhone', value)}
                        onValidate={(flag) => handleValidate('isValidPhone', flag)}
                    />
                </div>

                <div className="col-12">
                    <Input
                        type="text"
                        label="Id card"
                        value={profile.id_card}
                        isValid={profile.isValidIdCard}
                        feedback="Please provide a valid id card."
                        validator="id_card"
                        onChange={(value) => handleChange('id_card', 'isValidIdCard', value)}
                        onValidate={(flag) => handleValidate('isValidIdCard', flag)}
                    />
                </div>

                {error && (
                    <div className="col-12">
                        <Error msg={error} />
                    </div>
                )}

                {success && (
                    <div className="col-12">
                        <Success msg={success} />
                    </div>
                )}

                <div className="col-12 d-grid mt-4">
                    <button type="submit" className="btn btn-primary ripple"
                        onClick={handleSubmit}>Save</button>
                </div>
            </form>
        </div>
    );
}

export default UserEditProfileForm;