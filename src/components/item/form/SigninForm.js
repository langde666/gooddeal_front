import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { signin, setToken } from '../../../apis/auth';
import { regexTest } from '../../../helper/test';
import SocialForm from './SocialForm';
import Input from '../../ui/Input';
import Loading from '../../ui/Loading';
import Error from '../../ui/Error';

const SigninForm = ({ onSwap = () => {} }) => {
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const [account, setAccount] = useState({
        username: '',
        password: '',
        isValidUsername: true,
        isValidPassword: true,
    });

    const history = useHistory();

    const handleChange = (name, isValidName, value) => {
        setError('');
        setAccount({
            ...account,
            [name]: value,
            [isValidName]: true,
        });
    };

    const handleValidate = (isValidName, flag) => {
        setError('');
        setAccount({
            ...account,
            [isValidName]: flag,
        });
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
                isValidPassword: regexTest('password', password),
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
                    const { accessToken, refreshToken, _id } = data;
                    setToken({ accessToken, refreshToken, _id }, () => {
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
        <div className="sign-in-form-wrap position-relative">
            {isloading && <Loading />}

            <form className="sign-in-form mb-2 row" onSubmit={handleFormSubmit}>
                <div className="col-12">
                    <Input
                        type="text"
                        label="Email address or phone number"
                        value={account.username}
                        isValid={account.isValidUsername}
                        feedback="Please provide a valid email address or phone number."
                        validator="email|phone"
                        onChange={(value) =>
                            handleChange('username', 'isValidUsername', value)
                        }
                        onValidate={(flag) =>
                            handleValidate('isValidUsername', flag)
                        }
                    />
                </div>

                <div className="col-12">
                    <Input
                        type="password"
                        label="Password"
                        validator="password"
                        value={account.password}
                        isValid={account.isValidPassword}
                        feedback="Please provide a valid password."
                        onChange={(value) =>
                            handleChange('password', 'isValidPassword', value)
                        }
                        onValidate={(flag) =>
                            handleValidate('isValidPassword', flag)
                        }
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
                    <SocialForm />
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
        </div>
    );
};

export default SigninForm;
