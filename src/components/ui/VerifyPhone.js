const VerifyPhone = ({ isPhoneActive = false }) => {
    const sendConfirmCode = () => {

    }

    return (
        !isPhoneActive ? (
            <button
                type="button"
                className="btn btn-primary btn-sm ripple"
                onClick={sendConfirmCode}
            >
                Verify phone number!
            </button>
        ) : (
            <small className="ms-2 d-block text-success">verified</small>
        )
    )
}

export default VerifyPhone;