import React, { Fragment } from 'react';
import Modal from '../form/Modal';
import SignupForm from '../form/SignupForm';
import SigninForm from '../form/SigninForm';
import useToggle from '../../hooks/useToggle';

const SigninItem = ({ title = 'Sign in' }) => {
    const [signinFlag, toggleSigninFlag] = useToggle(true);

    return (
        <Fragment>
            <button
                className="sign-in-item btn btn-outline-light ripple"
                data-bs-toggle="modal"
                data-bs-target="#signup-form"
                onClick={() => toggleSigninFlag(true)}
            >
                {title}
            </button>

            <Modal
                id="signup-form"
                hasCloseBtn={false}
                subTitle={!signinFlag ? 'Signing up is easy.' : 'Welcome back!'}
            >
                {signinFlag ? (
                    <SigninForm onToggle={toggleSigninFlag} />
                ) : (
                    <SignupForm onToggle={toggleSigninFlag} />
                )}
            </Modal>
        </Fragment>
    );
};

export default SigninItem;
