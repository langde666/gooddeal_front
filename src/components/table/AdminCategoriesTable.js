import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getToken } from '../../apis/auth';
import {
    listCategories,
    removeCategory,
    restoreCategory,
} from '../../apis/category';
import Pagination from '../ui/Pagination';
import SearchInput from '../ui/SearchInput';
import SortByButton from './sub/SortByButton';
import DeletedLabel from '../label/DeletedLabel';
import CategorySmallCard from '../card/CategorySmallCard';
import Loading from '../ui/Loading';
import Error from '../ui/Error';
import Success from '../ui/Success';
import ConfirmDialog from '../ui/ConfirmDialog';
import CategorySelector from '../seletor/CategorySelector';

const IMG = process.env.REACT_APP_STATIC_URL;

const AdminCateroriesTable = ({ heading = true }) => {
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isConfirming, setIsConfirming] = useState(false);
    const [isConfirming1, setIsConfirming1] = useState(false);
    const [run, setRun] = useState(false);

    const [removedCategory, setRemovedCategory] = useState({});
    const [restoredCategory, setRestoredCategory] = useState({});

    const [categories, setCategories] = useState([]);
    const [pagination, setPagination] = useState({
        size: 0,
    });
    const [filter, setFilter] = useState({
        search: '',
        categoryId: '',
        sortBy: 'categoryId',
        order: 'asc',
        limit: 6,
        page: 1,
    });

    const { _id, accessToken } = getToken();

    const init = () => {
        setError('');
        setIsLoading(true);
        listCategories(_id, accessToken, filter)
            .then((data) => {
                if (data.error) {
                    setError(data.error);
                    setIsLoading(false);
                } else {
                    setCategories(data.categories);
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

    const handleRemoveCategory = (category) => {
        setRemovedCategory(category);
        setIsConfirming(true);
    };

    const handleRestoreCategory = (category) => {
        setRestoredCategory(category);
        setIsConfirming1(true);
    };

    const onSubmitRemove = () => {
        setError('');
        setSuccess('');
        setIsLoading(true);
        removeCategory(_id, accessToken, removedCategory._id)
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
        restoreCategory(_id, accessToken, restoredCategory._id)
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
        <div className="admin-categories-manager-table-wrap position-relative">
            {isloading && <Loading />}
            {isConfirming && (
                <ConfirmDialog
                    title="Remove this category"
                    message={
                        <span>
                            Are you sure you want to remove{' '}
                            <CategorySmallCard category={removedCategory} />
                        </span>
                    }
                    color="danger"
                    onSubmit={onSubmitRemove}
                    onClose={() => setIsConfirming(false)}
                />
            )}
            {isConfirming1 && (
                <ConfirmDialog
                    title="Restore this category"
                    message={
                        <span>
                            Are you sure you want to restore{' '}
                            <CategorySmallCard category={restoredCategory} />
                        </span>
                    }
                    onSubmit={onSubmitRestore}
                    onClose={() => setIsConfirming1(false)}
                />
            )}

            {heading && <h4 className="mb-3">Category</h4>}

            <div className="mb-4">
                <CategorySelector isActive={true} isSelected={false} />
            </div>

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
                            to="/admin/category/createNewCategory"
                        >
                            <i className="fas fa-plus-circle me-2"></i>New
                            category
                        </Link>
                    </div>
                </div>
                <span className="me-2">{pagination.size || 0} results</span>
            </div>

            <table className="admin-categories-manager-table table align-middle table-hover mt-2 table-sm text-center">
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
                                title="Category"
                                sortBy="categoryId"
                                onSet={(order, sortBy) =>
                                    handleSetSortBy(order, sortBy)
                                }
                            />
                        </th>
                        <th scope="col">
                            <SortByButton
                                currentSortBy={filter.sortBy}
                                title="Name"
                                sortBy="name"
                                onSet={(order, sortBy) =>
                                    handleSetSortBy(order, sortBy)
                                }
                            />
                        </th>
                        <th scope="col">
                            <SortByButton
                                currentSortBy={filter.sortBy}
                                title="Image"
                                sortBy="image"
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
                    {categories.map((category, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td
                                className="text-start ps-4"
                                style={{ width: '400px' }}
                            >
                                <CategorySmallCard category={category} />
                            </td>
                            <td className="text-start ps-4">{category.name}</td>
                            <td>
                                <div
                                    style={{
                                        position: 'relative',
                                        paddingBottom: '100px',
                                        width: '100px',
                                        height: '0',
                                    }}
                                >
                                    <img
                                        src={IMG + category.image}
                                        alt={category.name}
                                        style={{
                                            position: 'absolute',
                                            width: '100%',
                                            height: '100%',
                                            top: '0',
                                            left: '0',
                                            objectFit: 'cover',
                                        }}
                                    />
                                </div>
                            </td>
                            <td>{category.isDeleted && <DeletedLabel />}</td>
                            <td className="text-nowrap">
                                <div className="position-relative d-inline-block me-2">
                                    <Link
                                        type="button"
                                        className="btn btn-primary ripple cus-tooltip"
                                        to={`/admin/category/editCategory/${category._id}`}
                                    >
                                        <i className="fas fa-pen"></i>
                                    </Link>
                                    <small className="cus-tooltip-msg">
                                        Edit category
                                    </small>
                                </div>

                                {!category.isDeleted ? (
                                    <div className="position-relative d-inline-block">
                                        <button
                                            type="button"
                                            className="btn btn-outline-danger ripple cus-tooltip"
                                            onClick={() =>
                                                handleRemoveCategory(category)
                                            }
                                        >
                                            <i className="fas fa-trash-alt"></i>
                                        </button>
                                        <small className="cus-tooltip-msg">
                                            Remove category
                                        </small>
                                    </div>
                                ) : (
                                    <div className="position-relative d-inline-block">
                                        <button
                                            type="button"
                                            className="btn btn-outline-primary ripple cus-tooltip"
                                            onClick={() =>
                                                handleRestoreCategory(category)
                                            }
                                        >
                                            <i className="fas fa-trash-restore-alt"></i>
                                        </button>
                                        <small className="cus-tooltip-msg">
                                            Restore category
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

export default AdminCateroriesTable;
