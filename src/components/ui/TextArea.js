import { useState, useEffect } from "react";

const TextArea = ({
    onChange = () => { },
    onBlur = () => { },
    value = '',
    label = 'Enter something',
    isValid = true,
    isDisabled = false,
    feedback = 'Please provide a valid value',
}) => {
    const [rows, setRows] = useState(6);

    const handleChange = (e) => {
        if (onChange) {
            onChange();
        }

        const textareaLineHeight = 24;
        const previousRows = rows; // reset number of rows in textarea
        const currentRows = ~~(e.target.scrollHeight / textareaLineHeight);

        if (currentRows > 6 && currentRows >= previousRows) {
            setRows(currentRows);
        }
        else {
            setRows(6);
        }
    };

    return (
        <div className="cus-input-group">
            <textarea
                required
                disabled={isDisabled}
                className={`cus-input-group-input form-control ${isValid ? '' : 'is-invalid'}`}
                onChange={handleChange}
                onBlur={onBlur}
                rows={rows}
                value={value}
            ></textarea>
            <label className="cus-input-group-label">{label}</label>
            <span className="cus-input-group-bar"></span>
            <small className="invalid-feedback">{feedback}</small>
        </div>

    );
};

export default TextArea;