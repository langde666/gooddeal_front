import { useState, useEffect } from 'react';
import { getToken } from '../../apis/auth';
import {
    listTransactionsByStore,
    listTransactionsForAdmin,
} from '../../apis/transaction';
import { humanReadableDate } from '../../helper/humanReadable';
import { formatPrice } from '../../helper/formatPrice';
import Loading from '../ui/Loading';
import Error from '../ui/Error';
import Pagination from '../ui/Pagination';
import SortByButton from './sub/SortByButton';
import TransactionStatusLabel from '../label/TransactionStatusLabel';
import EWalletInfo from '../info/EWalletInfo';
import CreateTransactionItem from '../item/CreateTransactionItem';
import StoreSmallCard from '../card/StoreSmallCard';

const TransactionsTable = ({
    storeId = '',
    by = 'admin',
    heading = true,
    owner = {},
    eWallet = 0,
}) => {
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [run, setRun] = useState(false);

    const [transactions, setTransactions] = useState([]);
    const [pagination, setPagination] = useState({
        size: 0,
    });
    const [filter, setFilter] = useState({
        sortBy: 'createdAt',
        order: 'desc',
        limit: 6,
        page: 1,
    });

    const { _id: userId, accessToken } = getToken();

    const init = () => {
        setError('');
        setIsLoading(true);

        if (by === 'store')
            listTransactionsByStore(userId, accessToken, filter, storeId)
                .then((data) => {
                    if (data.error) setError(data.error);
                    else {
                        setTransactions(data.transactions);
                        setPagination({
                            size: data.size,
                            pageCurrent: data.filter.pageCurrent,
                            pageCount: data.filter.pageCount,
                        });
                    }
                    setIsLoading(false);
                })
                .catch((error) => {
                    setError('Server Error');
                    setIsLoading(false);
                });
        else
            listTransactionsForAdmin(userId, accessToken, filter)
                .then((data) => {
                    if (data.error) setError(data.error);
                    else {
                        setTransactions(data.transactions);
                        setPagination({
                            size: data.size,
                            pageCurrent: data.filter.pageCurrent,
                            pageCount: data.filter.pageCount,
                        });
                    }
                    setIsLoading(false);
                })
                .catch((error) => {
                    setError('Server Error');
                    setIsLoading(false);
                });
    };

    useEffect(() => {
        init();
    }, [storeId, by, filter, run]);

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
        <div className="position-relative">
            {heading && (
                <h4 className="mb-3">
                    {by === 'admin'
                        ? 'Transactions in System'
                        : 'Your E-Wallet'}
                </h4>
            )}

            {isloading && <Loading />}
            {error && <Error msg={error} />}

            <div className="d-flex justify-content-between align-items-end">
                <div className="d-flex align-items-center">
                    {by !== 'admin' && (
                        <>
                            <EWalletInfo eWallet={eWallet} />
                            {owner && userId == owner._id && (
                                <div className="ms-4">
                                    <CreateTransactionItem
                                        storeId={storeId}
                                        eWallet={eWallet}
                                        onRun={() => setRun(!run)}
                                    />
                                </div>
                            )}
                        </>
                    )}
                </div>

                <span className="me-2 text-nowrap res-hide">
                    {pagination.size || 0} results
                </span>
            </div>

            <div className="table-scroll my-2">
                <table className="table align-middle table-hover table-bordered table-sm text-center">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">
                                <SortByButton
                                    currentOrder={filter.order}
                                    currentSortBy={filter.sortBy}
                                    title="Transaction"
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
                                    title="Amount"
                                    sortBy="amount"
                                    onSet={(order, sortBy) =>
                                        handleSetSortBy(order, sortBy)
                                    }
                                />
                            </th>
                            {by === 'admin' && (
                                <th scope="col">
                                    <SortByButton
                                        currentOrder={filter.order}
                                        currentSortBy={filter.sortBy}
                                        title="Store"
                                        sortBy="storeId"
                                        onSet={(order, sortBy) =>
                                            handleSetSortBy(order, sortBy)
                                        }
                                    />
                                </th>
                            )}
                            <th scope="col">
                                <SortByButton
                                    currentOrder={filter.order}
                                    currentSortBy={filter.sortBy}
                                    title="Status"
                                    sortBy="isUp"
                                    onSet={(order, sortBy) =>
                                        handleSetSortBy(order, sortBy)
                                    }
                                />
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction, index) => (
                            <tr key={index}>
                                <th scope="row">
                                    {index +
                                        1 +
                                        (filter.page - 1) * filter.limit}
                                </th>
                                <td>
                                    <small>{transaction._id}</small>
                                </td>
                                <td>
                                    <small>
                                        {humanReadableDate(
                                            transaction.createdAt,
                                        )}
                                    </small>
                                </td>
                                <td>
                                    <small className="text-nowrap">
                                        {transaction.amount &&
                                            formatPrice(
                                                transaction.amount
                                                    .$numberDecimal,
                                            )}{' '}
                                        VND
                                    </small>
                                </td>
                                {by === 'admin' && (
                                    <td className="text-start ps-4">
                                        <StoreSmallCard
                                            store={transaction.storeId}
                                        />
                                    </td>
                                )}
                                <td>
                                    <small>
                                        <TransactionStatusLabel
                                            isUp={transaction.isUp}
                                        />
                                    </small>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {pagination.size != 0 && (
                <Pagination
                    pagination={pagination}
                    onChangePage={handleChangePage}
                />
            )}
        </div>
    );
};

export default TransactionsTable;
