import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { getToken } from '../../../apis/auth';
import { updateAccount } from '../../../apis/user';
import { addUser } from '../../../actions/user';
import useRegex from '../../../hooks/useRegex';
import useToggle from '../../../hooks/useToggle';
import Input from '../../ui/Input';
import VerifyEmail from '../../ui/VerifyEmail';
import VerifyPhone from '../../ui/VerifyPhone';
import Loading from '../../ui/Loading';
import Error from '../../ui/Error';
import ConfirmDialog from '../../ui/ConfirmDialog';

// const dayFormat = (date) => {
//     const readableDate = new Date(date);
//     const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//     const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

//     return readableDate.getFullYear() + ' ' +
//         months[readableDate.getMonth()] + ' ' +
//         readableDate.getDate() + ', ' +
//         days[readableDate.getDay()] + ' ' +
//         readableDate.getHours() + ':' +
//         readableDate.getMinutes();
// }

const AccountForm = (props) => {
    const [isloading, setIsLoading] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);
    const [error, setError] = useState('');
    const [profile, setProfile] = useState({});
    let { email, isEmailActive, phone, isPhoneActive, googleId, facebookId } = useSelector(state => state.user.user);

    const dispatch = useDispatch();
    useEffect(() => {
        console.log('render');
        setProfile({
            email: email || '',
            phone: phone || '',
            password: '',
            isValidEmail: true,
            isValidPhone: true,
            isValidPassword: true,
        });
    }, [email, isEmailActive, phone, isPhoneActive])

    const [regexTest] = useRegex();
    const [onEditingFlag, toggleOnEditingFlag] = useToggle(false);

    const handleChange = (e, name) => {
        switch (name) {
            case 'email': {
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

            case 'password': {
                setProfile({
                    ...profile,
                    password: e.target.value,
                    isValidPassword: true,
                });
                return;
            }
        }
    }

    const handleValidate = (name) => {
        switch (name) {
            case 'email': {
                setProfile({
                    ...profile,
                    isValidEmail: regexTest('emailLess', profile.email) && (email && profile.email != ''),
                });
                return;
            }

            case 'phone': {
                setProfile({
                    ...profile,
                    isValidPhone: regexTest('phoneLess', profile.phone) && (phone && profile.phone != ''),
                });
                return;
            }

            case 'password': {
                setProfile({
                    ...profile,
                    isValidPassword: regexTest('passwordLess', profile.password),
                });
                return;
            }
        }
    }

    const handleOnEditingFlag = () => {
        toggleOnEditingFlag()
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const { password } = profile;
        if (!password) {
            setProfile({
                ...profile,
                isValidEmail: regexTest('emailLess', profile.email) && (email && profile.email != ''),
                isValidPhone: regexTest('phoneLess', profile.phone) && (phone && profile.phone != ''),
                isValidPassword: regexTest('passwordLess', profile.password),
            });
            return;
        }

        if (!profile.isValidEmail || !profile.isValidPhone || !profile.isValidPassword) return;

        setIsConfirming(true);
    }

    const onSubmit = () => {
        const user = { currentPassword: profile.password }
        if (profile.email) user.email = profile.email;
        if (profile.phone) user.phone = profile.phone;
        const { _id, accessToken } = getToken();
        setError('');
        setIsLoading(true);

        updateAccount(_id, accessToken, user)
            .then(data => {
                if (data.error) {
                    setError(data.error);
                    setIsLoading(false);
                    setTimeout(() => {
                        setError('');
                    }, 3000);
                }
                else {
                    dispatch(addUser(data.user));
                    setIsLoading(false);
                    toggleOnEditingFlag(false);
                }
            })
            .catch(error => {
                setError('Server Error');
                setIsLoading(false);
                setTimeout(() => {
                    setError('');
                }, 3000);
            });
    }

    return (
        <div className="profile-form-wrap border border-primary rounded-2 p-2 position-relative">
            {isloading && <Loading />}

            {isConfirming && <ConfirmDialog
                title='Edit account'
                onSubmit={onSubmit}
                onClose={() => setIsConfirming(false)}
            />}

            <form className="profile-form row"
                onSubmit={handleFormSubmit}
            >
                <div className="col-12 cus-col-has-icon">
                    <Input
                        type="text"
                        label="Email"
                        value={profile.email}
                        isValid={profile.isValidEmail}
                        isDisabled={(googleId || facebookId) ? true : !onEditingFlag}
                        feedback="Please provide a valid email."
                        onChange={(e) => handleChange(e, 'email')}
                        onBlur={() => handleValidate('email')}
                    />

                    {(googleId || facebookId) && (
                        <div className="gg-fb-account-icon position-relative">
                            {googleId && <img
                                className="social-img me-2 rounded-circle cus-tooltip"
                                src="https://img.icons8.com/color/48/000000/google-logo.png"
                            />}
                            {facebookId && <img
                                className="social-img me-2 rounded-circle cus-tooltip"
                                src="https://img.icons8.com/color/48/000000/facebook-new.png"
                            />}
                            <small className="cus-tooltip-msg">Google/Facebook email address</small>
                        </div>)}
                </div>

                {email && <div className={`col-12 mb-2 ${isEmailActive ? 'mt-n1' : ''}`}>
                    <VerifyEmail isEmailActive={isEmailActive} />
                </div>}

                <div className="col-12">
                    <Input
                        type="text"
                        label="Phone number"
                        value={profile.phone}
                        isValid={profile.isValidPhone}
                        isDisabled={!onEditingFlag}
                        feedback="Please provide a valid phone number."
                        onChange={(e) => handleChange(e, 'phone')}
                        onBlur={() => handleValidate('phone')}
                    />
                </div>

                {phone && <div className={`col-12 mb-2 ${isPhoneActive ? 'mt-n1' : ''}`}>
                    <VerifyPhone isPhoneActive={isPhoneActive} />
                </div>}

                {onEditingFlag && (<div className="col-12">
                    <Input
                        type="password"
                        label="Current password"
                        value={profile.password}
                        isValid={profile.isValidPassword}
                        feedback="Please provide a valid password."
                        onChange={(e) => handleChange(e, 'password')}
                        onBlur={() => handleValidate('password')}
                    />
                </div>)}

                {error && (
                    <div className="col-12">
                        <Error msg={error} />
                    </div>
                )}

                <div className="col-12 d-flex mt-2 justify-content-start">
                    <div className="position-relative">
                        <button type="button"
                            className={`btn ${onEditingFlag ? 'btn-outline-danger' : 'btn-outline-primary'} ripple cus-tooltip`}
                            onClick={handleOnEditingFlag}>
                            <i className="fas fa-edit"></i>
                        </button>
                        <small className="cus-tooltip-msg">edit account</small>
                    </div>

                    <button type="submit"
                        className={`ms-2 px-5 btn btn-primary ripple ${onEditingFlag ? '' : 'visually-hidden'}`}
                        onClick={handleFormSubmit}
                    >
                        Save</button>
                </div>

                {/* <div className="col-12 mt-4">
                    <Input
                        type="text"
                        label="Role"
                        value={role}
                        isDisabled={true}
                        isValid={true}
                    />
                </div>

                <div className="col-12">
                    <Input
                        type="text"
                        label="Created at"
                        value={dayFormat(createdAt)}
                        isDisabled={true}
                    />
                </div> */}
            </form>
        </div>
    );
}

export default AccountForm;