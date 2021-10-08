import Modal from './Modal';
import SignupForm from '../auth/form/SignupForm';
import SigninForm from '../auth/form/SigninForm';
import useToggle from '../../hooks/useToggle';

const SigninItem = ({ title = 'Sign in' }) => {
    const [signinFlag, toggleSigninFlag] = useToggle(true);

    return (
        <div className="sign-in-item-wrap position-relative">
            <button
                className="sign-in-item btn btn-outline-light cus-outline cus-tooltip ripple"
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
                    <SigninForm onSwap={toggleSigninFlag} />
                ) : (
                    <SignupForm onSwap={toggleSigninFlag} />
                )}
            </Modal>

            <small className="cus-tooltip-msg">Join with us!</small>
        </div>
    );
};

export default SigninItem;
