import { useState, useEffect, Fragment } from 'react';
import { getToken } from '../../apis/auth';
import {
    listStyleValues,
    listActiveStyleValues,
    removeStyleValue,
    restoreStyleValue,
} from '../../apis/style';
import DeletedLabel from '../label/DeletedLabel';
import Loading from '../ui/Loading';
import Error from '../ui/Error';
import Success from '../ui/Success';
import ConfirmDialog from '../ui/ConfirmDialog';
import Modal from '../ui/Modal';
import AddValueStyleItem from '../item/AddValueStyleItem';
import AdminEditStyleValueForm from '../item/form/AdminEditStyleValueForm';

const StyleValuesTable = ({
    heading = true,
    styleId = '',
    isActive = false,
}) => {
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isConfirming, setIsConfirming] = useState(false);
    const [isConfirming1, setIsConfirming1] = useState(false);
    const [run, setRun] = useState(false);

    const [removedStyleValue, setRemovedStyleValue] = useState({});
    const [restoredStyleValue, setRestoredStyleValue] = useState({});
    const [editedStyleValue, setEditedStyleValue] = useState({});

    const [styleValues, setStyleValues] = useState([]);
    const [style, setStyle] = useState({});

    const { _id, accessToken } = getToken();

    const init = () => {
        setError('');
        setIsLoading(true);
        if (!isActive) {
            listStyleValues(_id, accessToken, styleId)
                .then((data) => {
                    if (data.error) {
                        setError(data.error);
                        setIsLoading(false);
                    } else {
                        setStyleValues(data.styleValues);
                        setStyle(data.style);
                        setIsLoading(false);
                    }
                })
                .catch((error) => {
                    setError('Server Error');
                    setIsLoading(false);
                });
        } else {
            listActiveStyleValues(styleId)
                .then((data) => {
                    if (data.error) {
                        setError(data.error);
                        setIsLoading(false);
                    } else {
                        setStyleValues(data.styleValues);
                        setStyle(data.style);
                        setIsLoading(false);
                    }
                })
                .catch((error) => {
                    setError('Server Error');
                    setIsLoading(false);
                });
        }
    };

    useEffect(() => {
        init();
    }, [styleId, run]);

    const handleRemove = (styleValue) => {
        setRemovedStyleValue(styleValue);
        setIsConfirming(true);
    };

    const handleRestore = (styleValue) => {
        setRestoredStyleValue(styleValue);
        setIsConfirming1(true);
    };

    const onSubmitRemove = () => {
        setError('');
        setSuccess('');
        setIsLoading(true);
        removeStyleValue(_id, accessToken, removedStyleValue._id)
            .then((data) => {
                if (data.error) {
                    setError(data.error);
                    setTimeout(() => {
                        setError('');
                    }, 3000);
                } else {
                    setSuccess(data.success);
                    setTimeout(() => {
                        setSuccess('');
                    }, 3000);
                    setRun(!run);
                }
                setIsLoading(false);
            })
            .catch((error) => {
                setError('Server Error');
                setTimeout(() => {
                    setError('');
                }, 3000);
                setIsLoading(false);
            });
    };

    const onSubmitRestore = () => {
        setError('');
        setSuccess('');
        setIsLoading(true);
        restoreStyleValue(_id, accessToken, restoredStyleValue._id)
            .then((data) => {
                if (data.error) {
                    setError(data.error);
                    setTimeout(() => {
                        setError('');
                    }, 3000);
                } else {
                    setSuccess(data.success);
                    setTimeout(() => {
                        setSuccess('');
                    }, 3000);
                    setRun(!run);
                }
                setIsLoading(false);
            })
            .catch((error) => {
                setError('Server Error');
                setTimeout(() => {
                    setError('');
                }, 3000);
                setIsLoading(false);
            });
    };

    return (
        <div className="style-values-manager-table-wrap position-relative">
            {isloading && <Loading />}
            {isConfirming && (
                <ConfirmDialog
                    title="Remove this value"
                    color="danger"
                    onSubmit={onSubmitRemove}
                    onClose={() => setIsConfirming(false)}
                />
            )}
            {isConfirming1 && (
                <ConfirmDialog
                    title="Restore this value"
                    onSubmit={onSubmitRestore}
                    onClose={() => setIsConfirming1(false)}
                />
            )}

            {heading && <h4 className="mb-3">Values of '{style.name}'</h4>}

            {isloading && <Loading />}
            {error && <Error msg={error} />}
            {success && <Success msg={success} />}

            <div className="d-flex justify-content-between align-items-end">
                <div className="option-wrap d-flex align-items-center">
                    <div className="ms-2">
                        <AddValueStyleItem
                            styleId={styleId}
                            styleName={style.name}
                            onRun={() => setRun(!run)}
                        />
                    </div>
                </div>
                <span className="me-2">{styleValues.length || 0} results</span>
            </div>

            <table className="style-values-manager-table table align-middle table-hover mt-2 table-sm">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        {!isActive && (
                            <Fragment>
                                <th scope="col">Status</th>
                                <th scope="col"></th>
                            </Fragment>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {styleValues.map((value, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td className="">{value.name}</td>
                            {!isActive && (
                                <Fragment>
                                    <td>
                                        {value.isDeleted && <DeletedLabel />}
                                    </td>
                                    <td className="text-nowrap">
                                        <div className="position-relative d-inline-block me-2">
                                            <button
                                                type="button"
                                                className="btn btn-primary ripple cus-tooltip"
                                                data-bs-toggle="modal"
                                                data-bs-target="#edit-style-value-form"
                                                onClick={() =>
                                                    setEditedStyleValue(value)
                                                }
                                            >
                                                <i className="fas fa-pen"></i>
                                            </button>
                                            <small className="cus-tooltip-msg">
                                                Edit value
                                            </small>
                                        </div>

                                        {!value.isDeleted ? (
                                            <div className="position-relative d-inline-block">
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-danger ripple cus-tooltip"
                                                    onClick={() =>
                                                        handleRemove(value)
                                                    }
                                                >
                                                    <i className="fas fa-trash-alt"></i>
                                                </button>
                                                <small className="cus-tooltip-msg">
                                                    Remove value
                                                </small>
                                            </div>
                                        ) : (
                                            <div className="position-relative d-inline-block">
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-primary ripple cus-tooltip"
                                                    onClick={() =>
                                                        handleRestore(value)
                                                    }
                                                >
                                                    <i className="fas fa-trash-restore-alt"></i>
                                                </button>
                                                <small className="cus-tooltip-msg">
                                                    Restore value
                                                </small>
                                            </div>
                                        )}
                                    </td>
                                </Fragment>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>

            {!isActive && (
                <Modal
                    id="edit-style-value-form"
                    hasCloseBtn={false}
                    title="Edit value"
                >
                    <AdminEditStyleValueForm
                        oldStyleValue={editedStyleValue}
                        onRun={() => setRun(!run)}
                    />
                </Modal>
            )}
        </div>
    );
};

export default StyleValuesTable;
