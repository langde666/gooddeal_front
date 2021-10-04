import { useState } from 'react';
import { Link } from 'react-router-dom';
import useToggle from '../../hooks/useToggle';

const SignupForm = ({ onSwap = () => {} }) => {
    const [showPasswordFlag, togglePasswordFlag] = useToggle(true);

    return (
        <form className="sign-up-form mb-2 row">
            <div className="col-6 cus-input-group">
                <input
                    type="text"
                    required
                    className="cus-input-group-input form-control"
                    id="inputFirstname"
                />
                <label
                    htmlFor="inputFirstname"
                    className="cus-input-group-label"
                >
                    First name
                </label>
                <span className="cus-input-group-bar"></span>
            </div>

            <div className="col-6 cus-input-group">
                <input
                    type="text"
                    required
                    className="cus-input-group-input form-control"
                    id="inputLastname"
                />
                <label
                    htmlFor="inputLastname"
                    className="cus-input-group-label"
                >
                    Last name
                </label>
                <span className="cus-input-group-bar"></span>
            </div>

            <div className="col-12 cus-input-group">
                <input
                    type="text"
                    required
                    className="cus-input-group-input form-control"
                    id="inputEmailOrPhone"
                />
                <label
                    htmlFor="inputEmailOrPhone"
                    className="cus-input-group-label"
                >
                    Email address or phone number
                </label>
                <span className="cus-input-group-bar"></span>
            </div>

            <div className="col-12 cus-input-group">
                <input
                    type={showPasswordFlag ? 'password' : 'text'}
                    required
                    className="cus-input-group-input cus-input-group-input--password form-control"
                    id="inputPassword"
                />
                <label
                    htmlFor="inputPassword"
                    className="cus-input-group-label"
                >
                    Password
                </label>
                <span className="cus-input-group-bar"></span>
                <i
                    className={
                        showPasswordFlag
                            ? 'show-hide-password-icon fas fa-eye'
                            : 'show-hide-password-icon fas fa-eye-slash'
                    }
                    onClick={() => togglePasswordFlag()}
                ></i>
            </div>

            <div className="col-12 d-grid mt-4">
                <button
                    type="submit"
                    className="btn btn-primary ripple fw-bold"
                    onClick={() => {}}
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
                        By Signing up or Continue with Google or Facebook, you
                        agree to GoodDeal's{' '}
                    </span>
                    <Link to="/legal/termsOfUse" target="_blank">
                        Terms of Use
                    </Link>
                    <span className="text-muted" target="_blank">
                        {' '}
                        and{' '}
                    </span>
                    <Link to="/legal/privacy">Privacy Policy</Link>.
                </small>
            </div>
        </form>
    );
};

export default SignupForm;
