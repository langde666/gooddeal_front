import React, { useState } from 'react';

const SignupForm = (props) => {
    const [showPasswordFlag, setshowPasswordFlag] = useState(true);

    const handleShowPassword = () => {
        setshowPasswordFlag(!showPasswordFlag);
    }

    return (
        <form className="sign-up-form row">
            <div className="col-6 cus-input-group">
                <input type="text" required className="cus-input-group-input form-control" id="inputFirstname" />
                <label htmlFor="inputFirstname" className="cus-input-group-label">First name</label>
                <span className="cus-input-group-bar"></span>
            </div>

            <div className="col-6 cus-input-group">
                <input type="text" required className="cus-input-group-input form-control" id="inputLastname" />
                <label htmlFor="inputLastname" className="cus-input-group-label">Last name</label>
                <span className="cus-input-group-bar"></span>
            </div>

            <div className="col-12 cus-input-group">
                <input type="text" required className="cus-input-group-input form-control" id="inputEmailOrPhone" />
                <label htmlFor="inputEmailOrPhone" className="cus-input-group-label">Email address or phone number</label>
                <span className="cus-input-group-bar"></span>
            </div>

            <div className="col-12 cus-input-group">
                <input type={showPasswordFlag ? "password" : "text"} required className="cus-input-group-input cus-input-group-input--password form-control" id="inputPassword" />
                <label htmlFor="inputPassword" className="cus-input-group-label">Password</label>
                <span className="cus-input-group-bar"></span>

                <i className={showPasswordFlag ? "show-hide-password fas fa-eye" : "show-hide-password fas fa-eye-slash"} onClick={handleShowPassword}></i>
            </div>
        </form>
    );
}

export default SignupForm;