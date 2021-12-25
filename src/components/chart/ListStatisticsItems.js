import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getToken } from '../../apis/auth';
import { listOrdersForAdmin, listOrdersByStore } from '../../apis/order';
import {
    listProductsForAdmin,
    listProductsForManager,
} from '../../apis/product';
import { listUserForAdmin } from '../../apis/user';
import { listStoresForAdmin } from '../../apis/store';
import { groupByDate, groupByJoined, groupBySold } from '../../helper/groupBy';
import { formatPrice } from '../../helper/formatPrice';
import LineChart from './LineChart';
import BarChart from './BarChart';
import DoughnutChart from './DoughnutChart';
import DropDownMenu from '../ui/DropDownMenu';
import Loading from '../ui/Loading';
import Error from '../ui/Error';
import UserSmallCard from '../card/UserSmallCard';
import StoreSmallCard from '../card/StoreSmallCard';
import ProductSmallCard from '../card/ProductSmallCard';

const groupByFunc = {
    order: groupByDate,
    product: groupBySold,
    user: groupByJoined,
    store: groupByJoined,
};

const titles = {
    order: 'Sales statistics by orders',
    product: 'Sales statistics by products',
    user: 'Statistics of new users',
    store: 'Statistics of new stores',
};

const ListStatisticsItems = ({ by = 'admin', storeId = '' }) => {
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const [items, setItems] = useState({
        order: [],
        product: [],
        user: [],
        store: [],
    });
    const [options, setOptions] = useState({
        flag: 'order',
        by: 'hours',
        sliceEnd: 6,
        type: 'line',
    });

    const { _id, accessToken } = getToken();

    const adminInit = async () => {
        setError('');
        setIsLoading(true);

        try {
            const orderData = await listOrdersForAdmin(_id, accessToken, {
                limit: 1000,
                sortBy: 'createdAt',
                order: 'desc',
                page: 1,
                status: 'Delivered',
            });

            const productData = await listProductsForAdmin(_id, accessToken, {
                search: '',
                sortBy: 'sold',
                isActive: 'true',
                order: 'desc',
                limit: 1000,
                page: 1,
            });

            const userData = await listUserForAdmin(_id, accessToken, {
                search: '',
                sortBy: 'point',
                order: 'desc',
                limit: 1000,
                page: 1,
                role: 'user',
            });

            const storeData = await listStoresForAdmin(_id, accessToken, {
                search: '',
                sortBy: 'point',
                sortMoreBy: 'rating',
                isActive: 'true',
                order: 'desc',
                limit: 1000,
                page: 1,
            });

            setItems({
                ...items,
                order: orderData.orders,
                product: productData.products,
                user: userData.users,
                store: storeData.stores,
            });
        } catch (e) {
            setError('Server Error');
        }

        setIsLoading(false);
    };

    const vendorInit = async () => {
        setError('');
        setIsLoading(true);

        try {
            const orderData = await listOrdersByStore(
                _id,
                accessToken,
                {
                    limit: 1000,
                    sortBy: 'createdAt',
                    order: 'desc',
                    page: 1,
                    status: 'Delivered',
                },
                storeId,
            );

            const productData = await listProductsForManager(
                _id,
                accessToken,
                {
                    search: '',
                    sortBy: 'sold',
                    isActive: 'true',
                    order: 'desc',
                    limit: 1000,
                    page: 1,
                },
                storeId,
            );

            setItems({
                ...items,
                order: orderData.orders,
                product: productData.products,
            });
        } catch (e) {
            setError('Server Error');
        }

        setIsLoading(false);
    };

    useEffect(() => {
        if (by === 'admin') adminInit();
        else vendorInit();
    }, [by, storeId]);

    return (
        <div className="position-relative">
            {isloading && <Loading />}
            {error && <Error msg={error} />}
            <div className="d-flex justify-content-start align-items-center mb-2">
                {by === 'admin' && (
                    <>
                        <button
                            type="button"
                            className={`btn ${
                                options.flag === 'user'
                                    ? 'btn-funny'
                                    : 'btn-outline-funny'
                            } btn-lg ripple p-4 px-5 me-2 res-p-1-lg`}
                            onClick={() =>
                                setOptions({
                                    ...options,
                                    flag: 'user',
                                })
                            }
                        >
                            <i className="fas fa-user-friends"></i>
                            <span className="ms-3 res-hide">
                                {items.user.length}
                            </span>
                            <span className="ms-1 res-hide-lg">Users</span>
                        </button>

                        <button
                            type="button"
                            className={`btn ${
                                options.flag === 'store'
                                    ? 'btn-golden'
                                    : 'btn-outline-golden'
                            } btn-lg ripple p-4 px-5 me-2 res-p-1-lg`}
                            onClick={() =>
                                setOptions({
                                    ...options,
                                    flag: 'store',
                                })
                            }
                        >
                            <i className="fas fa-store"></i>
                            <span className="ms-3 res-hide">
                                {items.store.length}
                            </span>
                            <span className="ms-1 res-hide-lg">Stores</span>
                        </button>
                    </>
                )}

                <button
                    type="button"
                    className={`btn ${
                        options.flag === 'product'
                            ? 'btn-primary'
                            : 'btn-outline-primary'
                    } btn-lg ripple p-4 px-5 me-2 res-p-1-lg`}
                    onClick={() =>
                        setOptions({
                            ...options,
                            flag: 'product',
                        })
                    }
                >
                    <i className="fas fa-box"></i>
                    <span className="ms-3 res-hide">
                        {items.product.length}
                    </span>
                    <span className="ms-1 res-hide-lg">Products</span>
                </button>

                <button
                    type="button"
                    className={`btn ${
                        options.flag === 'order'
                            ? 'btn-pink'
                            : 'btn-outline-pink'
                    } btn-lg ripple p-4 px-5 res-p-1-lg`}
                    onClick={() =>
                        setOptions({
                            ...options,
                            flag: 'order',
                        })
                    }
                >
                    <i className="fas fa-clipboard"></i>
                    <span className="ms-3 res-hide">{items.order.length}</span>
                    <span className="ms-1 res-hide-lg">Orders</span>
                </button>
            </div>

            <div className="container-fluid px-2">
                <div className="row">
                    <div className="col-xl-8 col-lg-6">
                        <form className="d-flex">
                            {options.flag !== 'product' ? (
                                <div className="me-2">
                                    <DropDownMenu
                                        listItem={[
                                            {
                                                label: 'Hour',
                                                value: 'hours',
                                                icon: (
                                                    <i className="far fa-clock"></i>
                                                ),
                                            },
                                            {
                                                label: 'Day',
                                                value: 'date',
                                                icon: (
                                                    <i className="fas fa-calendar-day"></i>
                                                ),
                                            },
                                            {
                                                label: 'Month',
                                                value: 'month',
                                                icon: (
                                                    <i className="fas fa-calendar-alt"></i>
                                                ),
                                            },
                                            {
                                                label: 'Year',
                                                value: 'year',
                                                icon: (
                                                    <i className="fas fa-calendar-minus"></i>
                                                ),
                                            },
                                        ]}
                                        value={options.by}
                                        setValue={(value) =>
                                            setOptions({
                                                ...options,
                                                by: value,
                                            })
                                        }
                                        label="Statistics by"
                                        borderBtn={true}
                                    />
                                </div>
                            ) : (
                                <div className="me-2">
                                    <DropDownMenu
                                        listItem={[
                                            {
                                                label: '6 Products',
                                                value: 6,
                                            },
                                            {
                                                label: '10 Products',
                                                value: 10,
                                            },
                                            {
                                                label: '50 Products',
                                                value: 50,
                                            },
                                            {
                                                label: '100 Products',
                                                value: 100,
                                            },
                                        ]}
                                        value={options.sliceEnd}
                                        setValue={(value) =>
                                            setOptions({
                                                ...options,
                                                sliceEnd: value,
                                            })
                                        }
                                        label="Statistics by"
                                        borderBtn={true}
                                    />
                                </div>
                            )}
                            <div>
                                <DropDownMenu
                                    listItem={[
                                        {
                                            label: 'Line',
                                            value: 'line',
                                            icon: (
                                                <i className="fas fa-chart-line"></i>
                                            ),
                                        },
                                        {
                                            label: 'Bar',
                                            value: 'bar',
                                            icon: (
                                                <i className="fas fa-chart-bar"></i>
                                            ),
                                        },
                                        {
                                            label: 'Doughnut',
                                            value: 'doughnut',
                                            icon: (
                                                <i className="fas fa-chart-pie"></i>
                                            ),
                                        },
                                    ]}
                                    value={options.type}
                                    setValue={(value) =>
                                        setOptions({
                                            ...options,
                                            type: value,
                                        })
                                    }
                                    label="Chart type"
                                    borderBtn={true}
                                />
                            </div>
                        </form>

                        <div className="mt-2">
                            {options.type === 'line' && (
                                <LineChart
                                    by={options.by}
                                    items={items[options.flag]}
                                    groupBy={groupByFunc[options.flag]}
                                    title={titles[options.flag]}
                                    sliceEnd={options.sliceEnd}
                                />
                            )}
                            {options.type === 'bar' && (
                                <BarChart
                                    by={options.by}
                                    items={items[options.flag]}
                                    groupBy={groupByFunc[options.flag]}
                                    title={titles[options.flag]}
                                    sliceEnd={options.sliceEnd}
                                />
                            )}
                            {options.type === 'doughnut' && (
                                <DoughnutChart
                                    by={options.by}
                                    items={items[options.flag]}
                                    groupBy={groupByFunc[options.flag]}
                                    title={titles[options.flag]}
                                    sliceEnd={options.sliceEnd}
                                />
                            )}
                        </div>
                    </div>

                    <div className="col-xl-4 col-lg-6 mt-4">
                        <h4 className="text-center my-4">
                            Top 6 {options.flag}s
                        </h4>
                        <div className="table-scroll my-2">
                            <table className="table align-middle table-hover table-bordered table-sm text-center">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">
                                            {options.flag[0].toUpperCase() +
                                                options.flag.substring(1)}
                                        </th>
                                        <th scope="col">
                                            {options.flag === 'user' && 'Point'}
                                            {options.flag === 'store' &&
                                                'Point'}
                                            {options.flag === 'product' &&
                                                'Sold'}
                                            {options.flag === 'order' &&
                                                'Total'}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {items[options.flag]
                                        .slice(0, 6)
                                        .map((item, index) => (
                                            <tr key={index}>
                                                <th scope="row">{index}</th>
                                                <td className="text-start">
                                                    {options.flag ===
                                                        'user' && (
                                                        <UserSmallCard
                                                            user={item}
                                                        />
                                                    )}
                                                    {options.flag ===
                                                        'store' && (
                                                        <StoreSmallCard
                                                            store={item}
                                                        />
                                                    )}
                                                    {options.flag ===
                                                        'product' && (
                                                        <ProductSmallCard
                                                            product={item}
                                                        />
                                                    )}
                                                    {options.flag ===
                                                        'order' && (
                                                        <small>
                                                            {item._id}
                                                        </small>
                                                    )}
                                                </td>
                                                <td>
                                                    {options.flag === 'user' &&
                                                        item.point}
                                                    {options.flag === 'store' &&
                                                        item.point}
                                                    {options.flag ===
                                                        'product' && item.sold}
                                                    {options.flag === 'order' &&
                                                    item &&
                                                    by === 'admin'
                                                        ? item &&
                                                          item.amountToGD && (
                                                              <small>
                                                                  {formatPrice(
                                                                      item
                                                                          .amountToGD
                                                                          .$numberDecimal,
                                                                  ) + ' VND'}
                                                              </small>
                                                          )
                                                        : item &&
                                                          item.amountToStore && (
                                                              <small>
                                                                  {formatPrice(
                                                                      item
                                                                          .amountToStore
                                                                          .$numberDecimal,
                                                                  ) + ' VND'}
                                                              </small>
                                                          )}
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="d-flex justify-content-end my-2">
                            <Link
                                to={`/${by}/${
                                    by === 'admin'
                                        ? options.flag
                                        : options.flag + 's/' + storeId
                                }`}
                                className="link-hover"
                            >
                                <span className="me-2 res-hide">
                                    Go to {options.flag} manager
                                </span>
                                <i className="fas fa-external-link-alt"></i>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ListStatisticsItems;
