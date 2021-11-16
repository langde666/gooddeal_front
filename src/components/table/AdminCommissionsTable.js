import { useState, useEffect } from 'react';
import { getToken } from '../../apis/auth';
import {
    listCommissions,
    removeCommission,
    restoreCommission,
} from '../../apis/commission';
import Pagination from '../ui/Pagination';
import SearchInput from '../ui/SearchInput';
import SortByButton from './sub/SortByButton';
import StoreCommissionLabel from '../label/StoreCommissionLabel';
import DeletedLabel from '../label/DeletedLabel';
import AdminCreateCommissionItem from '../item/AdminCreateCommissionItem';
import AdminEditCommissionForm from '../item/form/AdminEditCommissionForm';
import Modal from '../ui/Modal';
import Loading from '../ui/Loading';
import Error from '../ui/Error';
import Success from '../ui/Success';
import ConfirmDialog from '../ui/ConfirmDialog';

const AdminCommissionTable = ({ heading = true }) => {
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isConfirming, setIsConfirming] = useState(false);
    const [isConfirming1, setIsConfirming1] = useState(false);
    const [run, setRun] = useState(false);

    const [editedCommission, setEditedCommission] = useState({});
    const [removedCommission, setRemovedCommission] = useState({});
    const [restoredCommission, setRestoredCommission] = useState({});

    const [commissions, setCommissions] = useState([]);
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
        listCommissions(_id, accessToken, filter)
            .then((data) => {
                if (data.error) {
                    setError(data.error);
                    setIsLoading(false);
                } else {
                    setCommissions(data.commissions);
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

    const handleEditCommission = (commission) => {
        setEditedCommission(commission);
    };

    const handleRemoveCommission = (commission) => {
        setRemovedCommission(commission);
        setIsConfirming(true);
    };

    const handleRestoreCommission = (commission) => {
        setRestoredCommission(commission);
        setIsConfirming1(true);
    };

    const onSubmitRemove = () => {
        setError('');
        setSuccess('');
        setIsLoading(true);
        removeCommission(_id, accessToken, removedCommission._id)
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
        restoreCommission(_id, accessToken, restoredCommission._id)
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
        <div className="admin-commissions-manager-table-wrap position-relative">
            {isloading && <Loading />}
            {isConfirming && (
                <ConfirmDialog
                    title="Remove this commission"
                    message={
                        <span>
                            Are you sure you want to remove{' '}
                            <StoreCommissionLabel
                                commission={removedCommission}
                            />
                        </span>
                    }
                    color="danger"
                    onSubmit={onSubmitRemove}
                    onClose={() => setIsConfirming(false)}
                />
            )}
            {isConfirming1 && (
                <ConfirmDialog
                    title="Restore this commission"
                    message={
                        <span>
                            Are you sure you want to restore{' '}
                            <StoreCommissionLabel
                                commission={restoredCommission}
                            />
                        </span>
                    }
                    onSubmit={onSubmitRestore}
                    onClose={() => setIsConfirming1(false)}
                />
            )}

            {heading && <h4 className="mb-3">Commission</h4>}

            {isloading && <Loading />}
            {error && <Error msg={error} />}
            {success && <Success msg={success} />}

            <div className="d-flex justify-content-between align-items-end">
                <div className="option-wrap d-flex align-items-center">
                    <SearchInput onChange={handleChangeKeyword} />
                    <div className="ms-2">
                        <AdminCreateCommissionItem onRun={() => setRun(!run)} />
                    </div>
                </div>
                <span className="me-2">{pagination.size || 0} results</span>
            </div>

            <table className="admin-commissions-manager-table table align-middle table-hover mt-2 table-sm text-center">
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
                                title="Commission"
                                sortBy="name"
                                onSet={(order, sortBy) =>
                                    handleSetSortBy(order, sortBy)
                                }
                            />
                        </th>
                        <th scope="col">
                            <SortByButton
                                currentSortBy={filter.sortBy}
                                title="Cost"
                                sortBy="cost"
                                onSet={(order, sortBy) =>
                                    handleSetSortBy(order, sortBy)
                                }
                            />
                        </th>
                        <th scope="col">
                            <SortByButton
                                currentSortBy={filter.sortBy}
                                title="Description"
                                sortBy="description"
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
                    {commissions.map((commission, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td className="text-start ps-4">
                                <small>
                                    <StoreCommissionLabel
                                        commission={commission}
                                    />
                                </small>
                            </td>
                            <td>
                                <small>
                                    {commission.cost &&
                                        commission.cost.$numberDecimal}
                                    %
                                </small>
                            </td>
                            <td className="text-start ps-4">
                                <small>{commission.description}</small>
                            </td>
                            <td>
                                <small>
                                    {commission.isDeleted && <DeletedLabel />}
                                </small>
                            </td>
                            <td className="text-center">
                                <div className="position-relative d-inline-block me-2">
                                    <button
                                        type="button"
                                        className="btn btn-primary ripple cus-tooltip"
                                        data-bs-toggle="modal"
                                        data-bs-target="#edit-commission-form"
                                        onClick={() =>
                                            handleEditCommission(commission)
                                        }
                                    >
                                        <i className="fas fa-pen"></i>
                                    </button>
                                    <small className="cus-tooltip-msg">
                                        Edit commission
                                    </small>
                                </div>

                                {!commission.isDeleted ? (
                                    <div className="position-relative d-inline-block">
                                        <button
                                            type="button"
                                            className="btn btn-outline-danger ripple cus-tooltip"
                                            onClick={() =>
                                                handleRemoveCommission(
                                                    commission,
                                                )
                                            }
                                        >
                                            <i className="fas fa-trash-alt"></i>
                                        </button>
                                        <small className="cus-tooltip-msg">
                                            Remove commission
                                        </small>
                                    </div>
                                ) : (
                                    <div className="position-relative d-inline-block">
                                        <button
                                            type="button"
                                            className="btn btn-outline-primary ripple cus-tooltip"
                                            onClick={() =>
                                                handleRestoreCommission(
                                                    commission,
                                                )
                                            }
                                        >
                                            <i className="fas fa-trash-restore-alt"></i>
                                        </button>
                                        <small className="cus-tooltip-msg">
                                            Restore commission
                                        </small>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal
                id="edit-commission-form"
                hasCloseBtn={false}
                title="Edit commission"
            >
                <AdminEditCommissionForm
                    oldCommission={editedCommission}
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

export default AdminCommissionTable;