import { useState, useEffect } from 'react';
import { listActiveStyleValues } from '../../apis/style';
import Error from '../ui/Error';
import Loading from '../ui/Loading';

const MultiStyleValueSelector = ({ styleId = '', styleName = '', onSet }) => {
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const [values, setValues] = useState([]);
    const [selectedValues, setSelectedValues] = useState([]);

    const init = () => {
        setError('');
        setIsLoading(true);
        listActiveStyleValues(styleId)
            .then((data) => {
                if (data.error) setError(data.error);
                else {
                    setValues(data.styleValues);
                }
                setIsLoading(false);
            })
            .catch((error) => {
                setError('Server error');
                setIsLoading(false);
            });
    };

    useEffect(() => {
        init();

        const oldArray = selectedValues;
        const newArray = [];

        setSelectedValues(newArray);
        if (onSet) onSet(oldArray, newArray);
    }, [styleId]);

    const handleChoose = (value) => {
        const oldArray = selectedValues;
        const temp = oldArray.map((e) => e._id);

        if (temp.indexOf(value._id) === -1) {
            const newArray = [...oldArray, value];
            setSelectedValues(newArray);
            if (onSet) onSet(oldArray, newArray);
        }
    };

    const handleRemove = (index) => {
        const oldArray = selectedValues;
        const newArray = [
            ...oldArray.slice(0, index),
            ...oldArray.slice(index + 1),
        ];

        setSelectedValues(newArray);
        if (onSet) onSet(oldArray, newArray);
    };

    return (
        <div className="position-relative">
            {isloading && <Loading />}
            {error && <Error msg={error} />}

            <div className="position-relative mt-4">
                <label
                    className="position-absolute text-muted"
                    style={{
                        fontSize: '0.8rem',
                        left: '12px',
                        top: '-16px',
                    }}
                >
                    {styleName}
                </label>

                <div className="form-control border-0">
                    {selectedValues && selectedValues.length > 0 ? (
                        selectedValues.map((value, index) => (
                            <span
                                key={index}
                                className="mb-1 d-inline-flex align-items-center"
                            >
                                <span className="border p-1 rounded">
                                    {value.name}
                                </span>
                                <button
                                    type="button"
                                    className="btn btn-outline-danger btn-sm ripple ms-2 me-4"
                                    onClick={() => handleRemove(index)}
                                >
                                    <i className="fas fa-times-circle"></i>
                                </button>
                            </span>
                        ))
                    ) : (
                        <span>No values choosed</span>
                    )}

                    <div
                        style={{
                            width: '33.33333%',
                            maxHeight: '200px',
                            overflow: 'auto',
                        }}
                    >
                        <div className="list-group">
                            {values.map((value, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    className={`list-group-item ripple list-group-item-action ${
                                        selectedValues &&
                                        selectedValues
                                            .map((v) => v._id)
                                            .indexOf(value._id) !== -1 &&
                                        'active'
                                    }`}
                                    onClick={() => handleChoose(value)}
                                >
                                    {value.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MultiStyleValueSelector;
