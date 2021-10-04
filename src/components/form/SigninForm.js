import { useState, Fragment } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { signin, authenticate } from '../../apis/auth';
import Input from '../other/Input';
import Loading from '../other/Loading';
import Error from '../other/Error';
import useRegex from '../../hooks/useRegex';

const SigninForm = ({ onSwap = () => {} }) => {
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [account, setAccount] = useState({
        email: '',
        phone: '',
        password: '',
        isValidEmail: true,
        isValidPhone: true,
        isValidPassword: true,
    });

    const [regexTest] = useRegex();

    let history = useHistory();

    const handleChange = (e, name) => {
        setError('');

        const value = e.target.value;
        if (name == 'username') {
            setAccount({
                ...account,
                email: value,
                phone: value,
                isValidEmail: true,
                isValidPhone: true,
            });
            return;
        }

        if (name == 'password') {
            setAccount({
                ...account,
                password: value,
                isValidPassword: true,
            });
            return;
        }
    };

    const handleValidate = (name) => {
        const { email, phone, password } = account;
        if (name == 'username') {
            if (!regexTest('email', email) && !regexTest('phone', phone)) {
                setAccount({
                    ...account,
                    isValidEmail: false,
                    isValidPhone: false,
                });
                return;
            }

            if (!regexTest('email', email) && regexTest('phone', phone)) {
                setAccount({
                    ...account,
                    isValidEmail: false,
                    isValidPhone: true,
                });
                return;
            }

            if (regexTest('email', email) && !regexTest('phone', phone)) {
                setAccount({
                    ...account,
                    isValidEmail: true,
                    isValidPhone: false,
                });
                return;
            }
        }

        if (name == 'password' && !regexTest('passwordLess', password)) {
            setAccount({
                ...account,
                isValidPassword: false,
            });
            return;
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const {
            email,
            phone,
            password,
            isValidEmail,
            isValidPhone,
            isValidPassword,
        } = account;
        if (!email && !phone && !password) {
            setAccount({
                ...account,
                isValidEmail: false,
                isValidPhone: false,
                isValidPassword: false,
            });
            return;
        }

        if (!email && !phone && password) {
            setAccount({
                ...account,
                isValidEmail: false,
                isValidPhone: false,
            });
            return;
        }

        if (email && phone && !password) {
            setAccount({
                ...account,
                isValidPassword: false,
            });
            return;
        }

        let user = {};
        let flag = false;
        if (isValidEmail && isValidPassword) {
            user.email = account.email;
            user.password = account.password;
            flag = true;
        } else if (isValidPhone && isValidPassword) {
            user.phone = account.phone;
            user.password = account.password;
            flag = true;
        }

        if (flag) {
            setIsLoading(true);
            setError('');

            //call api
            signin(user)
                .then((data) => {
                    if (data.error) {
                        setError(data.error);
                        setIsLoading(false);
                    } else {
                        const { token, user, isExpired } = data;

                        authenticate({ token, user, isExpired }, () => {
                            history.go(0);
                        });
                    }
                })
                .catch((error) => {
                    setError('Server error!');
                });
        }
    };

    return (
        <Fragment>
            {isloading && <Loading />}

            <form className="sign-in-form mb-2 row" onSubmit={handleFormSubmit}>
                <div className="col-12">
                    <Input
                        type="text"
                        label="Email address or phone number"
                        value={account.email}
                        isValid={account.isValidEmail || account.isValidPhone}
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
                        feedback="Please provide a valid password."
                        onChange={(e) => handleChange(e, 'password')}
                        onBlur={() => handleValidate('password')}
                    />
                </div>

                {error && (
                    <div className="col-12">
                        <Error error={error} />
                    </div>
                )}

                <div className="col-12 d-grid mt-4">
                    <button
                        type="submit"
                        className="btn btn-primary ripple fw-bold"
                        onClick={handleFormSubmit}
                    >
                        Sign in
                    </button>
                </div>

                <div className="col-12 mt-4">
                    <small className="text-center d-block text-muted">
                        Don't have an account?{' '}
                        <span
                            className="sign-in-item text-primary text-decoration-underline"
                            onClick={onSwap}
                        >
                            Sign up
                        </span>
                    </small>
                </div>

                <div className="col-12 mt-4 cus-decoration-paragraph">
                    <p className="text-center text-muted cus-decoration-paragraph-p noselect">
                        OR
                    </p>
                </div>

                <div className="col-12 d-grid gap-2 mt-4">
                    <button
                        type="button"
                        className="btn btn--with-img btn-outline-primary ripple fw-bold"
                        onClick={() => {}}
                    >
                        <img
                            className="social-img me-2 rounded-circle"
                            src="https://img.icons8.com/color/48/000000/google-logo.png"
                        />
                        Continue with Google
                    </button>

                    <button
                        type="button"
                        className="btn btn--with-img btn-outline-primary ripple fw-bold"
                        onClick={() => {}}
                    >
                        <img
                            className="social-img me-2 rounded-circle"
                            src="https://img.icons8.com/color/48/000000/facebook-new.png"
                        />
                        Continue with Facebook
                    </button>
                </div>

                <div className="col-12 mt-4">
                    <small className="text-center d-block mx-4">
                        <span className="text-muted">
                            By Signing in or Continue with Google or Facebook,
                            you agree to GoodDeal's{' '}
                        </span>
                        <Link to="/legal/termsOfUse" target="_blank">
                            Terms of Use
                        </Link>
                        <span className="text-muted"> and </span>
                        <Link to="/legal/privacy" target="_blank">
                            Privacy Policy
                        </Link>
                        .
                    </small>
                </div>
            </form>
        </Fragment>
    );
};

export default SigninForm;
