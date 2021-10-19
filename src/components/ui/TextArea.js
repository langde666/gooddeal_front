const TextArea = ({
    onChange = () => { },
    onBlur = () => { },
    value = '',
    label = 'Enter something',
    isValid = true,
    isDisabled = false,
    feedback = 'Please provide a valid value',
}) => (
    <div className="cus-input-group">
        <textarea
            required
            disabled={isDisabled}
            className={`cus-input-group-input form-control ${isValid ? '' : 'is-invalid'}`}
            onChange={onChange}
            onBlur={onBlur}
            rows="10"
            value={value}
        ></textarea>
        <label className="cus-input-group-label">{label}</label>
        <span className="cus-input-group-bar"></span>
        <small className="invalid-feedback">{feedback}</small>
    </div>

);

export default TextArea;