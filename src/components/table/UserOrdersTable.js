import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getToken } from '../../apis/auth';
import { listOrdersByUser } from '../../apis/order';
import { formatPrice } from '../../helper/formatPrice';
import { humanReadableDate } from '../../helper/humanReadable';
import { calcTime } from '../../helper/calcTime';
import StoreSmallCard from '../card/StoreSmallCard';
import Pagination from '../ui/Pagination';
import Loading from '../ui/Loading';
import Error from '../ui/Error';
import SortByButton from './sub/SortByButton';
import OrderStatusLabel from '../label/OrderStatusLabel';
import UserCancelOrderButton from '../button/UserCancelOrderButton';

const UserOrdersTable = ({ heading = true }) => {
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [run, setRun] = useState(false);

    const [orders, setOrders] = useState([]);
    const [pagination, setPagination] = useState({
        size: 0,
    });
    const [filter, setFilter] = useState({
        status: '',
        sortBy: 'createdAt',
        order: 'desc',
        limit: 6,
        page: 1,
    });

    const { _id, accessToken } = getToken();

    const init = () => {
        setError('');
        setIsLoading(true);
        listOrdersByUser(_id, accessToken, filter)
            .then((data) => {
                if (data.error) {
                    setError(data.error);
                    setIsLoading(false);
                } else {
                    setOrders(data.orders);
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

    return (
        <div className="purchases-manager-table-wrap position-relative">
            {heading && <h4 className="mb-3">Your Purchases</h4>}

            {isloading && <Loading />}
            {error && <Error msg={error} />}

            <div className="d-flex justify-content-end align-items-end">
                <span className="me-2">{pagination.size || 0} results</span>
            </div>

            <table className="purchases-manager-table table align-middle table-hover table-bordered mt-2 table-sm text-center">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">
                            <SortByButton
                                currentOrder={filter.order}
                                currentSortBy={filter.sortBy}
                                title="Order"
                                sortBy="_id"
                                onSet={(order, sortBy) =>
                                    handleSetSortBy(order, sortBy)
                                }
                            />
                        </th>
                        <th scope="col">
                            <SortByButton
                                currentOrder={filter.order}
                                currentSortBy={filter.sortBy}
                                title="Created at"
                                sortBy="createdAt"
                                onSet={(order, sortBy) =>
                                    handleSetSortBy(order, sortBy)
                                }
                            />
                        </th>
                        <th scope="col">
                            <SortByButton
                                currentOrder={filter.order}
                                currentSortBy={filter.sortBy}
                                title="Total"
                                sortBy="amountFromUser"
                                onSet={(order, sortBy) =>
                                    handleSetSortBy(order, sortBy)
                                }
                            />
                        </th>
                        <th scope="col">
                            <SortByButton
                                currentOrder={filter.order}
                                currentSortBy={filter.sortBy}
                                title="Seller"
                                sortBy="orderId"
                                onSet={(order, sortBy) =>
                                    handleSetSortBy(order, sortBy)
                                }
                            />
                        </th>
                        <th scope="col">
                            <SortByButton
                                currentOrder={filter.order}
                                currentSortBy={filter.sortBy}
                                title="Delivery"
                                sortBy="deliveryId"
                                onSet={(order, sortBy) =>
                                    handleSetSortBy(order, sortBy)
                                }
                            />
                        </th>
                        <th scope="col">
                            <SortByButton
                                currentOrder={filter.order}
                                currentSortBy={filter.sortBy}
                                title="Status"
                                sortBy="status"
                                onSet={(order, sortBy) =>
                                    handleSetSortBy(order, sortBy)
                                }
                            />
                        </th>

                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td>
                                <small>{order._id}</small>
                            </td>
                            <td>
                                <small>
                                    {humanReadableDate(order.createdAt)}
                                </small>
                            </td>
                            <td>
                                <small className="text-nowrap">
                                    {order.amountFromUser &&
                                        formatPrice(
                                            order.amountFromUser.$numberDecimal,
                                        )}{' '}
                                    VND
                                </small>
                            </td>
                            <td
                                className="text-start ps-2"
                                style={{ maxWidth: '300px' }}
                            >
                                <StoreSmallCard store={order.storeId} />
                            </td>
                            <td>
                                {order.deliveryId && (
                                    <small>
                                        {order.deliveryId.name}
                                        <br />
                                        {formatPrice(
                                            order.deliveryId.price
                                                .$numberDecimal,
                                        )}{' '}
                                        VND
                                    </small>
                                )}
                            </td>
                            <td>
                                <small>
                                    <OrderStatusLabel status={order.status} />
                                </small>
                            </td>
                            <td className="text-nowrap text-start">
                                <div className="position-relative d-inline-block">
                                    <div className="position-relative d-inline-block">
                                        <Link
                                            type="button"
                                            className="btn btn-primary ripple cus-tooltip"
                                            to={`/account/purchase/detail/${order._id}`}
                                        >
                                            <i className="fas fa-list-ul"></i>
                                        </Link>
                                        <small className="cus-tooltip-msg">
                                            View order detail
                                        </small>
                                    </div>

                                    {order.status === 'Not processed' &&
                                        calcTime(order.createdAt) < 1 && (
                                            <div className="position-relative d-inline-block ms-1">
                                                <div className="cus-tooltip d-inline-block text-start">
                                                    <UserCancelOrderButton
                                                        orderId={order._id}
                                                        detail={false}
                                                        status={order.status}
                                                        createdAt={
                                                            order.createdAt
                                                        }
                                                        onRun={() =>
                                                            setRun(!run)
                                                        }
                                                    />
                                                </div>

                                                <small className="cus-tooltip-msg">
                                                    Cancel order
                                                </small>
                                            </div>
                                        )}
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

export default UserOrdersTable;