import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addUser } from '../../../actions/user';
import { getToken } from '../../../apis/auth';
import { updateProfile } from '../../../apis/user';
import useRegex from '../../../hooks/useRegex';
import Input from '../../ui/Input';
import Loading from '../../ui/Loading';
import Error from '../../ui/Error';
import Success from '../../ui/Success';
import ConfirmDialog from '../../ui/ConfirmDialog';

const ProfileEditForm = (props) => {
    let { firstname, lastname, email, phone, id_card, googleId, facebookId } = useSelector(state => state.user.user);
    const [profile, setProfile] = useState({});
    const [isloading, setIsLoading] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [regexTest] = useRegex();
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

    const handleChange = (e, name) => {
        switch (name) {
            case 'firstname': {
                setProfile({
                    ...profile,
                    firstname: e.target.value,
                    isValidFirstname: true,
                });
                return;
            }
            case 'lastname': {
                setProfile({
                    ...profile,
                    lastname: e.target.value,
                    isValidLastname: true,
                });
                return;
            }
            case 'email': {
                if (googleId || facebookId) return;
                setProfile({
                    ...profile,
                    email: e.target.value,
                    isValidEmail: true,
                });
                return;
            }
            case 'phone': {
                setProfile({
                    ...profile,
                    phone: e.target.value,
                    isValidPhone: true,
                });
                return;
            }
            case 'id_card': {
                setProfile({
                    ...profile,
                    id_card: e.target.value,
                    isValidIdCard: true,
                });
                return;
            }
        }
    }

    const handleValidate = (name) => {
        switch (name) {
            case 'firstname': {
                setProfile({
                    ...profile,
                    isValidFirstname: regexTest('name', profile.firstname),
                });
                return;
            }
            case 'lastname': {
                setProfile({
                    ...profile,
                    isValidLastname: regexTest('name', profile.lastname),
                });
                return;
            }
            case 'email': {
                if (googleId || facebookId) return;
                setProfile({
                    ...profile,
                    isValidEmail: regexTest('email', profile.email) || (!email && profile.email == ''),
                });
                return;
            }
            case 'phone': {
                setProfile({
                    ...profile,
                    isValidPhone: regexTest('phone', profile.phone) || (!phone && profile.phone == ''),
                });
                return;
            }
            case 'id_card': {
                setProfile({
                    ...profile,
                    isValidIdCard: regexTest('id_card', profile.id_card) || (!id_card && profile.id_card == ''),
                });
                return;
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!profile.isValidFirstname ||
            !profile.isValidLastname ||
            !profile.isValidEmail ||
            !profile.isValidPhone ||
            !profile.isValidIdCard) {
            return;
        }
        else {
            setIsConfirming(true);
        }

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
                    dispatch(addUser(data.user));
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
                        onChange={(e) => handleChange(e, 'firstname')}
                        onBlur={() => handleValidate('firstname')}
                    />
                </div>

                <div className="col-6">
                    <Input
                        type="text"
                        label="Last name"
                        value={profile.lastname}
                        isValid={profile.isValidLastname}
                        feedback="Please provide a valid lastname."
                        onChange={(e) => handleChange(e, 'lastname')}
                        onBlur={() => handleValidate('lastname')}
                    />
                </div>

                {(!googleId && !facebookId) && <div className="col-12">
                    <Input
                        type="text"
                        label="Email address"
                        value={profile.email}
                        isValid={profile.isValidEmail}
                        feedback="Please provide a valid email address."
                        onChange={(e) => handleChange(e, 'email')}
                        onBlur={() => handleValidate('email')}
                    />
                </div>}

                <div className="col-12">
                    <Input
                        type="text"
                        label="Phone number"
                        value={profile.phone}
                        isValid={profile.isValidPhone}
                        feedback="Please provide a valid phone number."
                        onChange={(e) => handleChange(e, 'phone')}
                        onBlur={() => handleValidate('phone')}
                    />
                </div>

                <div className="col-12">
                    <Input
                        type="text"
                        label="Id card"
                        value={profile.id_card}
                        isValid={profile.isValidIdCard}
                        feedback="Please provide a valid id card."
                        onChange={(e) => handleChange(e, 'id_card')}
                        onBlur={() => handleValidate('id_card')}
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

export default ProfileEditForm;