import useToggle from '../../hooks/useToggle';

const Input = ({
    onChange = () => { },
    onBlur = () => { },
    type = 'text',
    value = '',
    label = 'Enter something',
    isValid = true,
    isDisabled = false,
    feedback = 'Please provide a valid value',
}) => {
    const [showPasswordFlag, togglePasswordFlag] = useToggle(true);

    return (
        <div className="cus-input-group">
            <input
                type={type == 'password' ? (showPasswordFlag ? 'password' : 'text') : type}
                required
                disabled={isDisabled}
                className={`cus-input-group-input form-control ${isValid ? '' : 'is-invalid'} ${type == 'password' ? 'cus-input-group-input--password' : ''}`}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
            />
            <label className="cus-input-group-label">{label}</label>
            <span className="cus-input-group-bar"></span>
            <small className="invalid-feedback">{feedback}</small>
            {type == 'password' && (
                <i
                    className={`show-hide-password-icon fas ${showPasswordFlag ? 'fa-eye' : ' fa-eye-slash'}`}
                    onClick={togglePasswordFlag}
                ></i>
            )}
        </div>
    );
};

export default Input;
