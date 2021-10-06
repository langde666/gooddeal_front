import { useState, Fragment } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { signin, setToken } from '../../apis/auth';
import Input from '../other/Input';
import Loading from '../other/Loading';
import Error from '../other/Error';
import AuthSocial from './AuthSocial';
import useRegex from '../../hooks/useRegex';

const SigninForm = ({ onSwap = () => {} }) => {
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [account, setAccount] = useState({
        username: '',
        password: '',
        isValidUsername: true,
        isValidPassword: true,
    });

    const [regexTest] = useRegex();
    let history = useHistory();

    //handle funcs
    const handleChange = (e, name) => {
        setError('');
        const value = e.target.value;
        switch (name) {
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
                    isValidPassword: regexTest(
                        'passwordLess',
                        account.password,
                    ),
                });
                return;
            }
        }
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const { username, password } = account;
        if (!username || !password) {
            setAccount({
                ...account,
                isValidUsername:
                    regexTest('email', username) ||
                    regexTest('phone', username),
                isValidPassword: regexTest('passwordLess', password),
            });
            return;
        }

        const { isValidUsername, isValidPassword } = account;
        if (!isValidUsername || !isValidPassword) return;

        const user = { password };
        regexTest('email', username) && (user.email = username);
        regexTest('phone', username) && (user.phone = username);

        setIsLoading(true);
        setError('');
        signin(user)
            .then((data) => {
                if (data.error) {
                    setError(data.error);
                    setIsLoading(false);
                } else {
                    const { accessToken, refreshToken, user } = data;
                    setToken({ accessToken, refreshToken, user }, () => {
                        history.go(0);
                    });
                }
            })
            .catch((error) => {
                setError('Server error!');
                setIsLoading(false);
            });
    };

    return (
        <Fragment>
            {isloading && <Loading />}

            <form className="sign-in-form mb-2 row" onSubmit={handleFormSubmit}>
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
                        feedback="Please provide a valid password."
                        onChange={(e) => handleChange(e, 'password')}
                        onBlur={() => handleValidate('password')}
                    />
                </div>

                {error && (
                    <div className="col-12">
                        <Error msg={error} />
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
                    <AuthSocial />
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
