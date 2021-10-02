import React from "react";
import Modal from '../form/Modal';
import SignupForm from '../form/SignupForm';

const Signup = (props) => {
    return (
        <div className="sign-up">
            <button type="button" className="btn btn-outline-light text-white ripple" data-bs-toggle="modal" data-bs-target="#signup-form">
                Sign up
            </button>

            <Modal
                id="signup-form"
                title="Sign up"
            >
                <SignupForm />
            </Modal>
        </div>
    )
}

export default Signup;