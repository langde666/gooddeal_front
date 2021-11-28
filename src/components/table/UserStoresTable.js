import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getToken } from '../../apis/auth';
import { listStoresByUser } from '../../apis/store';
import useUpdateDispatch from '../../hooks/useUpdateDispatch';
import StoreSmallCard from '../card/StoreSmallCard';
import ManagerRoleLabel from '../label/ManagerRoleLabel';
import StoreLicenseLabel from '../label/StoreLicenseLabel';
import StoreStatusLabel from '../label/StoreStatusLabel';
import OpenCloseStoreButton from '../button/OpenCloseStoreButton';
import Pagination from '../ui/Pagination';
import SearchInput from '../ui/SearchInput';
import Loading from '../ui/Loading';
import Error from '../ui/Error';
import SortByButton from './sub/SortByButton';

const UserStoresTable = ({ heading = true }) => {
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [run, setRun] = useState(false);

    const [stores, setStores] = useState([]);
    const [pagination, setPagination] = useState({
        size: 0,
    });
    const [filter, setFilter] = useState({
        search: '',
        sortBy: 'name',
        sortMoreBy: 'rating',
        order: 'asc',
        limit: 6,
        page: 1,
    });

    const { _id, accessToken } = getToken();
    const store = useSelector((state) => state.vendor.store);
    const [updateDispatch] = useUpdateDispatch();

    const init = () => {
        setError('');
        setIsLoading(true);
        listStoresByUser(_id, accessToken, filter)
            .then((data) => {
                if (data.error) {
                    setError(data.error);
                    setIsLoading(false);
                } else {
                    setStores(data.stores);
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

    const onHandleRun = (newStore) => {
        setRun(!run);
        if (store && store._id == newStore._id)
            updateDispatch('vendor', newStore);
    };

    const handleSetSortBy = (order, sortBy) => {
        setFilter({
            ...filter,
            sortBy,
            order,
        });
    };

    return (
        <div className="store-manager-table-wrap position-relative">
            {heading && <h4 className="mb-3">Your shops</h4>}

            {isloading && <Loading />}
            {error && <Error msg={error} />}

            <div className="d-flex justify-content-between align-items-end">
                <div className="option-wrap d-flex align-items-center">
                    <SearchInput onChange={handleChangeKeyword} />
                    <div className="ms-2">
                        <Link
                            type="button"
                            className="btn btn-primary ripple text-nowrap"
                            to="/account/shopManager/createNewShop"
                        >
                            <i className="fas fa-plus-circle me-2"></i>New shop
                        </Link>
                    </div>
                </div>
                <span className="me-2">{pagination.size || 0} results</span>
            </div>

            <table className="store-manager-table table align-middle table-hover mt-2 table-sm text-center table-bordered">
                <thead>
                    <tr>
                        <th scope="col">
                            <SortByButton
                                currentSortBy={filter.sortBy}
                                title="#"
                                sortBy="point"
                                onSet={(order, sortBy) =>
                                    handleSetSortBy(order, sortBy)
                                }
                            />
                        </th>
                        <th scope="col">
                            <SortByButton
                                currentSortBy={filter.sortBy}
                                title="Shop"
                                sortBy="name"
                                onSet={(order, sortBy) =>
                                    handleSetSortBy(order, sortBy)
                                }
                            />
                        </th>
                        <th scope="col">
                            <SortByButton
                                currentSortBy={filter.sortBy}
                                title="Role"
                                sortBy="ownerId"
                                onSet={(order, sortBy) =>
                                    handleSetSortBy(order, sortBy)
                                }
                            />
                        </th>
                        <th scope="col">
                            <SortByButton
                                currentSortBy={filter.sortBy}
                                title="License"
                                sortBy="isActive"
                                onSet={(order, sortBy) =>
                                    handleSetSortBy(order, sortBy)
                                }
                            />
                        </th>
                        <th scope="col">
                            <SortByButton
                                currentSortBy={filter.sortBy}
                                title="Status"
                                sortBy="isOpen"
                                onSet={(order, sortBy) =>
                                    handleSetSortBy(order, sortBy)
                                }
                            />
                        </th>

                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {stores.map((store, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td className="text-start ps-4">
                                <small>
                                    <StoreSmallCard store={store} />
                                </small>
                            </td>
                            <td className="text-start ps-5">
                                <small>
                                    <ManagerRoleLabel
                                        role={
                                            _id == store.ownerId._id
                                                ? 'owner'
                                                : 'staff'
                                        }
                                    />
                                </small>
                            </td>
                            <td className="text-start ps-5">
                                <small>
                                    <StoreLicenseLabel
                                        isActive={store.isActive}
                                    />
                                </small>
                            </td>
                            <td className="text-start ps-5">
                                <small>
                                    <StoreStatusLabel isOpen={store.isOpen} />
                                </small>
                            </td>
                            <td>
                                <div className="position-relative d-inline-block me-2">
                                    <div className="cus-tooltip d-inline-block text-start">
                                        <OpenCloseStoreButton
                                            storeId={store._id}
                                            isOpen={store.isOpen}
                                            detail={false}
                                            onRun={(store) =>
                                                onHandleRun(store)
                                            }
                                        />
                                    </div>

                                    <small className="cus-tooltip-msg">
                                        {store.isOpen
                                            ? 'Click to close shop'
                                            : 'Click to open shop'}
                                    </small>
                                </div>
                                <div className="position-relative d-inline-block">
                                    <Link
                                        type="button"
                                        className="btn btn-primary ripple cus-tooltip"
                                        to={`/vendor/${store._id}`}
                                    >
                                        <i className="fas fa-user-tie"></i>
                                    </Link>
                                    <small className="cus-tooltip-msg">
                                        Go to dashboard
                                    </small>
                                </div>
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

export default UserStoresTable;
