import { useState, useEffect } from 'react';

const ValueSelectorItem = ({ listValues = [], isEditable = true, onSet }) => {
    const [values, setValues] = useState(listValues);
    const [selectedValue, setSelectedValue] = useState({});

    useEffect(() => {
        setValues(listValues);
        const oldValue = selectedValue;
        const newValue = {};
        setSelectedValue(newValue);
        if (onSet) onSet(oldValue, newValue);
    }, [listValues]);

    const handleChoose = (value) => {
        const oldValue = selectedValue;
        const newValue = value;
        setSelectedValue(newValue);
        if (onSet) onSet(oldValue, newValue);
    };

    return (
        <div className="position-relative mb-4">
            <label
                className="position-absolute text-muted"
                style={{
                    fontSize: '0.8rem',
                    left: '12px',
                    top: '-16px',
                }}
            >
                {values[0].styleId.name}
            </label>

            <div className="">
                {values.map((value, index) => (
                    <button
                        key={index}
                        type="button"
                        className={`btn btn-sm border ms-2 mt-2 ${
                            isEditable && 'ripple'
                        } ${selectedValue._id === value._id && 'btn-primary'}`}
                        disabled={!isEditable}
                        onClick={() => handleChoose(value)}
                    >
                        <span>{value.name}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default ValueSelectorItem;
