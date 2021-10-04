import useToggle from '../../hooks/useToggle';

const Input = ({
    onChange = () => {},
    onBlur = () => {},
    type = 'text',
    value = '',
    label = 'Enter something',
    isValid = true,
    feedback = 'Please provide a valid value',
}) => {
    const [showPasswordFlag, togglePasswordFlag] = useToggle(true);

    return type !== 'password' ? (
        <div className="cus-input-group">
            <input
                type={type}
                required
                className={
                    isValid
                        ? 'cus-input-group-input form-control'
                        : 'cus-input-group-input form-control is-invalid'
                }
                onChange={onChange}
                onBlur={onBlur}
                value={value}
            />
            <label className="cus-input-group-label">{label}</label>
            <span className="cus-input-group-bar"></span>
            <small className="invalid-feedback">{feedback}</small>
        </div>
    ) : (
        <div className="cus-input-group">
            <input
                type={showPasswordFlag ? 'password' : 'text'}
                required
                className={
                    isValid
                        ? 'cus-input-group-input cus-input-group-input--password form-control'
                        : 'cus-input-group-input cus-input-group-input--password form-control is-invalid'
                }
                onChange={onChange}
                onBlur={onBlur}
                value={value}
            />
            <label className="cus-input-group-label">{label}</label>
            <span className="cus-input-group-bar"></span>
            <i
                className={
                    showPasswordFlag
                        ? 'show-hide-password-icon fas fa-eye'
                        : 'show-hide-password-icon fas fa-eye-slash'
                }
                onClick={() => togglePasswordFlag()}
            ></i>
            <small className="invalid-feedback">{feedback}</small>
        </div>
    );
};

export default Input;
