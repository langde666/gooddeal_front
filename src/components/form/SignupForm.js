import { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { signup } from '../../apis/auth';
import Input from '../other/Input';
import Loading from '../other/Loading';
import Error from '../other/Error';
import Success from '../other/Success';
import AuthSocial from './AuthSocial';
import useRegex from '../../hooks/useRegex';
import ConfirmDialog from '../other/ConfirmDialog';

const SignupForm = ({ onSwap = () => { } }) => {
    const [isloading, setIsLoading] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [account, setAccount] = useState({
        firstname: '',
        lastname: '',
        username: '',
        password: '',
        isValidFirstname: true,
        isValidLastname: true,
        isValidUsername: true,
        isValidPassword: true,
    });

    const [regexTest] = useRegex();

    //handle funcs
    const handleChange = (e, name) => {
        setError('');
        setSuccess('');
        const value = e.target.value;
        switch (name) {
            case 'firstname': {
                setAccount({
                    ...account,
                    firstname: value,
                    isValidFirstname: true,
                });
                return;
            }
            case 'lastname': {
                setAccount({
                    ...account,
                    lastname: value,
                    isValidLastname: true,
                });
                return;
            }
            case 'username': {
                setAccount({
                    ...account,
                    username: value,
                    isValidUsername: true,
                });
                return;
            }
            case 'password': {
                setAccount({
                    ...account,
                    password: value,
                    isValidPassword: true,
                });
                return;
            }
        }
    };

    const handleValidate = (name) => {
        switch (name) {
            case 'firstname': {
                setAccount({
                    ...account,
                    isValidFirstname: regexTest('name', account.firstname),
                });
                return;
            }
            case 'lastname': {
                setAccount({
                    ...account,
                    isValidLastname: regexTest('name', account.lastname),
                });
                return;
            }
            case 'username': {
                setAccount({
                    ...account,
                    isValidUsername:
                        regexTest('email', account.username) ||
                        regexTest('phone', account.username),
                });
                return;
            }
            case 'password': {
                setAccount({
                    ...account,
                    isValidPassword: regexTest('password', account.password),
                });
                return;
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { firstname, lastname, username, password } = account;
        if (!firstname || !lastname || !username || !password) {
            setAccount({
                ...account,
                isValidFirstname: regexTest('name', firstname),
                isValidLastname: regexTest('name', lastname),
                isValidUsername:
                    regexTest('email', username) ||
                    regexTest('phone', username),
                isValidPassword: regexTest('password', password),
            });
            return;
        }

        const {
            isValidFirstname,
            isValidLastname,
            isValidUsername,
            isValidPassword,
        } = account;
        if (
            !isValidFirstname ||
            !isValidLastname ||
            !isValidUsername ||
            !isValidPassword
        )
            return;

        setIsConfirming(true);
    };

    const onSignupSubmit = () => {
        const { firstname, lastname, username, password } = account;
        const user = { firstname, lastname, password };
        regexTest('email', username) && (user.email = username);
        regexTest('phone', username) && (user.phone = username);

        setIsLoading(true);
        setError('');
        setSuccess('');

        signup(user)
            .then((data) => {
                if (data.error) {
                    setError(data.error);
                    setIsLoading(false);
                } else {
                    setAccount({
                        ...account,
                        firstname: '',
                        lastname: '',
                        username: '',
                        password: '',
                    });

                    setSuccess(data.success);
                    setIsLoading(false);
                }
            })
            .catch((error) => {
                setError('Server error!');
                setIsLoading(false);
            });
    }

    return (
        <Fragment>
            {isloading && <Loading />}
            {isConfirming && <ConfirmDialog
                title='Sign up'
                message={
                    <small className="">
                        By Signing up or Continue with Google or Facebook,
                        you agree to GoodDeal's{' '}
                        <Link to="/legal/termsOfUse" target="_blank">
                            Terms of Use
                        </Link>
                        {' '}and{' '}
                        <Link to="/legal/privacy">Privacy Policy</Link>.
                    </small>
                }
                onSubmit={onSignupSubmit}
                onClose={() => setIsConfirming(false)}
            />}
            <form className="sign-up-form mb-2 row" onSubmit={handleSubmit}>
                <div className="col-6">
                    <Input
                        type="text"
                        label="First name"
                        value={account.firstname}
                        isValid={account.isValidFirstname}
                        feedback="Please provide a valid firstname."
                        onChange={(e) => handleChange(e, 'firstname')}
                        onBlur={() => handleValidate('firstname')}
                    />
                </div>

                <div className="col-6">
                    <Input
                        type="text"
                        label="Last name"
                        value={account.lastname}
                        isValid={account.isValidLastname}
                        feedback="Please provide a valid lastname."
                        onChange={(e) => handleChange(e, 'lastname')}
                        onBlur={() => handleValidate('lastname')}
                    />
                </div>

                <div className="col-12">
                    <Input
                        type="text"
                        label="Email address or phone number"
                        value={account.username}
                        isValid={account.isValidUsername}
                        feedback="Please provide a valid email address or phone number."
                        onChange={(e) => handleChange(e, 'username')}
                        onBlur={() => handleValidate('username')}
                    />
                </div>

                <div className="col-12">
                    <Input
                        type="password"
                        label="Password"
                        value={account.password}
                        isValid={account.isValidPassword}
                        feedback="Password must contain at least 6 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character such as @, $, !, %, *, ?, &."
                        onChange={(e) => handleChange(e, 'password')}
                        onBlur={() => handleValidate('password')}
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
                    <button
                        type="submit"
                        className="btn btn-primary ripple fw-bold"
                        onClick={handleSubmit}
                    >
                        Sign up
                    </button>
                </div>

                <div className="col-12 mt-4">
                    <small className="text-center d-block text-muted">
                        Have an account?{' '}
                        <span
                            className="sign-in-item text-primary text-decoration-underline"
                            onClick={onSwap}
                        >
                            Sign in
                        </span>
                    </small>
                </div>

                <div className="col-12 mt-4 cus-decoration-paragraph">
                    <p className="text-center text-muted cus-decoration-paragraph-p noselect">
                        OR
                    </p>
                </div>

                <div className="col-12 d-grid gap-2 mt-4">
                    <AuthSocial />
                </div>

                <div className="col-12 mt-4">
                    <small className="text-center d-block mx-4">
                        <span className="text-muted">
                            By Signing up or Continue with Google or Facebook,
                            you agree to GoodDeal's{' '}
                        </span>
                        <Link to="/legal/termsOfUse" target="_blank">
                            Terms of Use
                        </Link>
                        <span className="text-muted" target="_blank">
                            {' '}and{' '}
                        </span>
                        <Link to="/legal/privacy">Privacy Policy</Link>.
                    </small>
                </div>
            </form>
        </Fragment>
    );
};

export default SignupForm;