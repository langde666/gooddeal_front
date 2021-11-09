import { useState, useEffect } from 'react';
import { getToken } from '../../apis/auth';
import {
    listUserLevels,
    removeUserLevel,
    restoreUserLevel,
} from '../../apis/level';
import Pagination from '../ui/Pagination';
import SearchInput from '../ui/SearchInput';
import SortByButton from './sub/SortByButton';
import UserLevelLabel from '../label/UserLevelLabel';
import DeletedLabel from '../label/DeletedLabel';
import AdminCreateUserLevelItem from '../item/AdminCreateUserLevelItem';
import AdminEditUserLevelForm from '../item/form/AdminEditUserLevelForm';
import Modal from '../ui/Modal';
import Loading from '../ui/Loading';
import Error from '../ui/Error';
import Success from '../ui/Success';
import ConfirmDialog from '../ui/ConfirmDialog';

const AdminUserLevelsTable = ({ heading = true }) => {
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isConfirming, setIsConfirming] = useState(false);
    const [isConfirming1, setIsConfirming1] = useState(false);
    const [run, setRun] = useState(false);

    const [editedLevel, setEditedLevel] = useState({});
    const [removedLevel, setRemovedLevel] = useState({});
    const [restoredLevel, setRestoredLevel] = useState({});

    const [levels, setLevels] = useState([]);
    const [pagination, setPagination] = useState({
        size: 0,
    });
    const [filter, setFilter] = useState({
        search: '',
        sortBy: 'name',
        order: 'asc',
        limit: 6,
        page: 1,
    });

    const { _id, accessToken } = getToken();

    const init = () => {
        setError('');
        setIsLoading(true);
        listUserLevels(_id, accessToken, filter)
            .then((data) => {
                if (data.error) {
                    setError(data.error);
                    setIsLoading(false);
                } else {
                    setLevels(data.levels);
                    setPagination({
                        size: data.size,
                        pageCurrent: data.filter.pageCurrent,
                        pageCount: data.filter.pageCount,
                    });
                    setIsLoading(false);
                }
            })
            .catch((error) => {
                setError('Server Error');
                setIsLoading(false);
            });
    };

    useEffect(() => {
        init();
    }, [filter, run]);

    const handleChangeKeyword = (keyword) => {
        setFilter({
            ...filter,
            search: keyword,
            page: 1,
        });
    };

    const handleChangePage = (newPage) => {
        setFilter({
            ...filter,
            page: newPage,
        });
    };

    const handleSetSortBy = (order, sortBy) => {
        setFilter({
            ...filter,
            sortBy,
            order,
        });
    };

    const handleEditLevel = (level) => {
        setEditedLevel(level);
    };

    const handleRemoveLevel = (level) => {
        setRemovedLevel(level);
        setIsConfirming(true);
    };

    const handleRestoreLevel = (level) => {
        setRestoredLevel(level);
        setIsConfirming1(true);
    };

    const onSubmitRemove = () => {
        setError('');
        setSuccess('');
        setIsLoading(true);
        removeUserLevel(_id, accessToken, removedLevel._id)
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
        restoreUserLevel(_id, accessToken, restoredLevel._id)
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
        <div className="admin-user-levels-manager-table-wrap position-relative">
            {isloading && <Loading />}
            {isConfirming && (
                <ConfirmDialog
                    title="Remove this level"
                    message={
                        <span>
                            Are you sure you want to remove{' '}
                            <UserLevelLabel level={removedLevel} />
                        </span>
                    }
                    color="danger"
                    onSubmit={onSubmitRemove}
                    onClose={() => setIsConfirming(false)}
                />
            )}
            {isConfirming1 && (
                <ConfirmDialog
                    title="Restore this level"
                    message={
                        <span>
                            Are you sure you want to restore{' '}
                            <UserLevelLabel level={restoredLevel} />
                        </span>
                    }
                    onSubmit={onSubmitRestore}
                    onClose={() => setIsConfirming1(false)}
                />
            )}

            {heading && <h4 className="mb-3">User Levels</h4>}

            {isloading && <Loading />}
            {error && <Error msg={error} />}
            {success && <Success msg={success} />}

            <div className="d-flex justify-content-between align-items-end">
                <div className="option-wrap d-flex align-items-center">
                    <SearchInput onChange={handleChangeKeyword} />
                    <div className="ms-2">
                        <AdminCreateUserLevelItem onRun={() => setRun(!run)} />
                    </div>
                </div>
                <span className="me-2">{pagination.size || 0} results</span>
            </div>

            <table className="admin-user-levels-manager-table table align-middle table-hover mt-2 table-sm text-center">
                <thead>
                    <tr>
                        <th scope="col">
                            <SortByButton
                                currentSortBy={filter.sortBy}
                                title="#"
                                sortBy="_id"
                                onSet={(order, sortBy) =>
                                    handleSetSortBy(order, sortBy)
                                }
                            />
                        </th>
                        <th scope="col">
                            <SortByButton
                                currentSortBy={filter.sortBy}
                                title="User level"
                                sortBy="name"
                                onSet={(order, sortBy) =>
                                    handleSetSortBy(order, sortBy)
                                }
                            />
                        </th>
                        <th scope="col">
                            <SortByButton
                                currentSortBy={filter.sortBy}
                                title="Floor point"
                                sortBy="minPoint"
                                onSet={(order, sortBy) =>
                                    handleSetSortBy(order, sortBy)
                                }
                            />
                        </th>
                        <th scope="col">
                            <SortByButton
                                currentSortBy={filter.sortBy}
                                title="Discount"
                                sortBy="discount"
                                onSet={(order, sortBy) =>
                                    handleSetSortBy(order, sortBy)
                                }
                            />
                        </th>
                        <th scope="col">
                            <SortByButton
                                currentSortBy={filter.sortBy}
                                title="Color"
                                sortBy="color"
                                onSet={(order, sortBy) =>
                                    handleSetSortBy(order, sortBy)
                                }
                            />
                        </th>
                        <th scope="col">
                            <SortByButton
                                currentSortBy={filter.sortBy}
                                title="Status"
                                sortBy="isDeleted"
                                onSet={(order, sortBy) =>
                                    handleSetSortBy(order, sortBy)
                                }
                            />
                        </th>

                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {levels.map((level, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td className="text-start ps-4">
                                <UserLevelLabel level={level} />
                            </td>
                            <td>{level.minPoint}</td>
                            <td>
                                {level.discount &&
                                    level.discount.$numberDecimal}
                                %
                            </td>
                            <td>{level.color}</td>
                            <td>{level.isDeleted && <DeletedLabel />}</td>
                            <td className="text-center">
                                <div className="position-relative d-inline-block me-2">
                                    <button
                                        type="button"
                                        className="btn btn-primary ripple cus-tooltip"
                                        data-bs-toggle="modal"
                                        data-bs-target="#edit-level-form"
                                        onClick={() => handleEditLevel(level)}
                                    >
                                        <i className="fas fa-pen"></i>
                                    </button>
                                    <small className="cus-tooltip-msg">
                                        Edit Level
                                    </small>
                                </div>

                                {!level.isDeleted ? (
                                    <div className="position-relative d-inline-block">
                                        <button
                                            type="button"
                                            className="btn btn-outline-danger ripple cus-tooltip"
                                            onClick={() =>
                                                handleRemoveLevel(level)
                                            }
                                        >
                                            <i className="fas fa-trash-alt"></i>
                                        </button>
                                        <small className="cus-tooltip-msg">
                                            Remove level
                                        </small>
                                    </div>
                                ) : (
                                    <div className="position-relative d-inline-block">
                                        <button
                                            type="button"
                                            className="btn btn-outline-primary ripple cus-tooltip"
                                            onClick={() =>
                                                handleRestoreLevel(level)
                                            }
                                        >
                                            <i className="fas fa-trash-restore-alt"></i>
                                        </button>
                                        <small className="cus-tooltip-msg">
                                            Restore level
                                        </small>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal id="edit-level-form" hasCloseBtn={false} title="Edit Level">
                <AdminEditUserLevelForm
                    oldLevel={editedLevel}
                    onRun={() => setRun(!run)}
                />
            </Modal>

            {pagination.size != 0 && (
                <Pagination
                    pagination={pagination}
                    onChangePage={handleChangePage}
                />
            )}
        </div>
    );
};

export default AdminUserLevelsTable;
