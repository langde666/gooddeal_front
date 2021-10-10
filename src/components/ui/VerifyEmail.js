const VerifyEmail = ({ isEmailActive = false }) => {
    const sendConfirmCode = () => {

    }

    return (
        !isEmailActive ? (
            <button
                type="button"
                className="btn btn-primary btn-sm ripple"
                onClick={sendConfirmCode}
            >
                Verify email address!
            </button>
        ) : (
            <small className="ms-2 d-block text-success">verified</small>
        )
    )
}

export default VerifyEmail;