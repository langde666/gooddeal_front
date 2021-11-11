import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getToken } from '../../apis/auth';
import { listStyles, removeStyle, restoreStyle } from '../../apis/style';
import Pagination from '../ui/Pagination';
import SearchInput from '../ui/SearchInput';
import SortByButton from './sub/SortByButton';
import DeletedLabel from '../label/DeletedLabel';
import Loading from '../ui/Loading';
import Error from '../ui/Error';
import Success from '../ui/Success';
import ConfirmDialog from '../ui/ConfirmDialog';
import CategorySmallCard from '../card/CategorySmallCard';

const AdminStylesTable = ({ heading = true }) => {
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isConfirming, setIsConfirming] = useState(false);
    const [isConfirming1, setIsConfirming1] = useState(false);
    const [run, setRun] = useState(false);

    const [removedStyle, setRemovedStyle] = useState({});
    const [restoredStyle, setRestoredStyle] = useState({});

    const [styles, setStyles] = useState([]);
    const [pagination, setPagination] = useState({
        size: 0,
    });
    const [filter, setFilter] = useState({
        search: '',
        sortBy: 'name',
        categoryId: '',
        order: 'asc',
        limit: 6,
        page: 1,
    });

    const { _id, accessToken } = getToken();

    const init = () => {
        setError('');
        setIsLoading(true);
        listStyles(_id, accessToken, filter)
            .then((data) => {
                if (data.error) {
                    setError(data.error);
                    setIsLoading(false);
                } else {
                    setStyles(data.styles);
                    console.log(data.styles);
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

    const handleRemove = (style) => {
        setRemovedStyle(style);
        setIsConfirming(true);
    };

    const handleRestore = (style) => {
        setRestoredStyle(style);
        setIsConfirming1(true);
    };

    const onSubmitRemove = () => {
        setError('');
        setSuccess('');
        setIsLoading(true);
        removeStyle(_id, accessToken, removedStyle._id)
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
        restoreStyle(_id, accessToken, restoredStyle._id)
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
        <div className="admin-styles-manager-table-wrap position-relative">
            {isloading && <Loading />}
            {isConfirming && (
                <ConfirmDialog
                    title="Remove this style"
                    color="danger"
                    onSubmit={onSubmitRemove}
                    onClose={() => setIsConfirming(false)}
                />
            )}
            {isConfirming1 && (
                <ConfirmDialog
                    title="Restore this style"
                    onSubmit={onSubmitRestore}
                    onClose={() => setIsConfirming1(false)}
                />
            )}

            {heading && <h4 className="mb-3">Style</h4>}

            {isloading && <Loading />}
            {error && <Error msg={error} />}
            {success && <Success msg={success} />}

            <div className="d-flex justify-content-between align-items-end">
                <div className="option-wrap d-flex align-items-center">
                    <SearchInput onChange={handleChangeKeyword} />
                    <div className="ms-2">
                        <Link
                            type="button"
                            className="btn btn-primary ripple text-nowrap"
                            to="/admin/style/createNewStyle"
                        >
                            <i className="fas fa-plus-circle me-2"></i>New Style
                        </Link>
                    </div>
                </div>
                <span className="me-2">{pagination.size || 0} results</span>
            </div>

            <table className="admin-styles-manager-table table align-middle table-hover mt-2 table-sm text-center">
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
                                title="Style"
                                sortBy="name"
                                onSet={(order, sortBy) =>
                                    handleSetSortBy(order, sortBy)
                                }
                            />
                        </th>
                        <th scope="col">
                            <SortByButton
                                currentSortBy={filter.sortBy}
                                title="Of categories"
                                sortBy="categoryIds "
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
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {styles.map((style, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td className="text-start ps-4">{style.name}</td>

                            <td className="text-start ps-5">
                                {style.categoryIds.map((category, index) => (
                                    <div className="" key={index}>
                                        <CategorySmallCard
                                            category={category}
                                        />
                                    </div>
                                ))}
                            </td>

                            <td>{style.isDeleted && <DeletedLabel />}</td>
                            <td>
                                <div className="position-relative d-inline-block me-2">
                                    <Link
                                        type="button"
                                        className="btn btn-primary ripple cus-tooltip"
                                        to={`/admin/style/values/${style._id}`}
                                    >
                                        <i className="fas fa-list-ul"></i>
                                    </Link>
                                    <small className="cus-tooltip-msg">
                                        View list of values
                                    </small>
                                </div>
                            </td>

                            <td className="text-nowrap">
                                <div className="position-relative d-inline-block me-2">
                                    <Link
                                        type="button"
                                        className="btn btn-primary ripple cus-tooltip"
                                        to={`/admin/style/editStyle/${style._id}`}
                                    >
                                        <i className="fas fa-pen"></i>
                                    </Link>
                                    <small className="cus-tooltip-msg">
                                        Edit style
                                    </small>
                                </div>

                                {!style.isDeleted ? (
                                    <div className="position-relative d-inline-block">
                                        <button
                                            type="button"
                                            className="btn btn-outline-danger ripple cus-tooltip"
                                            onClick={() => handleRemove(style)}
                                        >
                                            <i className="fas fa-trash-alt"></i>
                                        </button>
                                        <small className="cus-tooltip-msg">
                                            Remove style
                                        </small>
                                    </div>
                                ) : (
                                    <div className="position-relative d-inline-block">
                                        <button
                                            type="button"
                                            className="btn btn-outline-primary ripple cus-tooltip"
                                            onClick={() => handleRestore(style)}
                                        >
                                            <i className="fas fa-trash-restore-alt"></i>
                                        </button>
                                        <small className="cus-tooltip-msg">
                                            Restore style
                                        </small>
                                    </div>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {pagination.size != 0 && (
                <Pagination
                    pagination={pagination}
                    onChangePage={handleChangePage}
                />
            )}
        </div>
    );
};

export default AdminStylesTable;
