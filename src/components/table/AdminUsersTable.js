import { useState, useEffect } from 'react';
import { getToken } from '../../apis/auth';
import { listUserForAdmin } from '../../apis/user';
import { humanReadableDate } from '../../helper/humanReadable';
import Pagination from '../ui/Pagination';
import SearchInput from '../ui/SearchInput';
import SortByButton from './sub/SortByButton';
import UserSmallCard from '../card/UserSmallCard';
import Loading from '../ui/Loading';
import Error from '../ui/Error';

const AdminUsersTable = ({ heading = true }) => {
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const [users, setUsers] = useState([]);
    const [pagination, setPagination] = useState({
        size: 0,
    });
    const [filter, setFilter] = useState({
        search: '',
        sortBy: 'firstname',
        role: 'customer',
        order: '',
        limit: 6,
        page: 1,
    });

    const { _id, accessToken } = getToken();

    const init = () => {
        setError('');
        setIsLoading(true);
        listUserForAdmin(_id, accessToken, filter)
            .then((data) => {
                if (data.error) {
                    setError(data.error);
                    setIsLoading(false);
                } else {
                    setUsers(data.users);
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
    }, [filter]);

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

    return (
        <div className="admin-users-manager-table-wrap position-relative">
            {isloading && <Loading />}

            {heading && <h4 className="mb-3">Users in the system</h4>}

            {isloading && <Loading />}
            {error && <Error msg={error} />}

            <div className="d-flex justify-content-between align-items-end">
                <div className="option-wrap d-flex align-items-center">
                    <SearchInput onChange={handleChangeKeyword} />
                </div>
                <span className="me-2">{pagination.size || 0} results</span>
            </div>

            <table className="admin-users-manager-table table align-middle table-hover mt-2 table-sm text-center">
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
                                title="User"
                                sortBy="firstname"
                                onSet={(order, sortBy) =>
                                    handleSetSortBy(order, sortBy)
                                }
                            />
                        </th>
                        <th scope="col">
                            <SortByButton
                                currentSortBy={filter.sortBy}
                                title="Id card"
                                sortBy="id_card"
                                onSet={(order, sortBy) =>
                                    handleSetSortBy(order, sortBy)
                                }
                            />
                        </th>
                        <th scope="col">
                            <SortByButton
                                currentSortBy={filter.sortBy}
                                title="Email"
                                sortBy="email"
                                onSet={(order, sortBy) =>
                                    handleSetSortBy(order, sortBy)
                                }
                            />
                        </th>
                        <th scope="col">
                            <SortByButton
                                currentSortBy={filter.sortBy}
                                title="Phone"
                                sortBy="phone"
                                onSet={(order, sortBy) =>
                                    handleSetSortBy(order, sortBy)
                                }
                            />
                        </th>
                        <th scope="col">
                            <SortByButton
                                currentSortBy={filter.sortBy}
                                title="Joined"
                                sortBy="createdAt"
                                onSet={(order, sortBy) =>
                                    handleSetSortBy(order, sortBy)
                                }
                            />
                        </th>

                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <td className="text-start ps-4">
                                <UserSmallCard user={user} />
                            </td>
                            <td>{user.id_card || '-'}</td>
                            <td>{user.email || '-'}</td>
                            <td>{user.phone || '-'}</td>
                            <td>{humanReadableDate(user.createdAt)}</td>
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

export default AdminUsersTable;
