import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getToken } from '../../apis/auth';
import { getlistUsers } from '../../apis/user';
import MainLayout from '../../components/layout/MainLayout';
import UserCard from '../../components/user/item/UserCard';
import Pagination from '../../components/ui/Pagination.js';
import Loading from '../../components/ui/Loading';
import Error from '../../components/ui/Error';
import useUpdateEffect from '../../hooks/useUpdateEffect';

const UserSearchPage = (props) => {
    const [error, setError] = useState('');
    const [isloading, setIsLoading] = useState(false);

    const keyword = new URLSearchParams(useLocation().search).get('keyword') || '';
    const [listUsers, setListUsers] = useState([]);
    const [pagination, setPagination] = useState({
        size: 0,
    });
    const [filter, setFilter] = useState({
        search: keyword,
        sortBy: 'point',
        role: 'customer',
        order: 'desc',
        limit: '8',
        page: 1,
    });

    const init = () => {
        setError('');
        setIsLoading(true);

        getlistUsers(filter)
            .then(data => {
                if (data.error) {
                    setError(data.error);
                    setIsLoading(false);
                }
                else {
                    setPagination({
                        size: data.size,
                        pageCurrent: data.filter.pageCurrent,
                        pageCount: data.filter.pageCount,
                    });
                    setListUsers(data.users);
                    setIsLoading(false);
                }
            })
            .catch(error => {
                setError('Server Error');
                setIsLoading(false);
            });
    }

    useEffect(() => {
        init();
    }, [filter]);

    useUpdateEffect(() => {
        setFilter({
            ...filter,
            search: keyword,
            page: 1,
        });
    }, [keyword]);

    const handleChangePage = (newPage) => {
        setFilter({
            ...filter,
            page: newPage,
        });
    }

    return (
        <MainLayout>
            <div className="user-search-page position-relative mx-auto"
                style={{ maxWidth: '990px', minHeight: '80vh' }}>
                {isloading && <Loading />}
                {error && <Error msg={error} />}

                <div className="d-flex justify-content-end">
                    <span className="me-3">{pagination.size || 0} results</span>
                </div>

                <div className="user-search-list row mt-3">
                    {listUsers && listUsers.map((user, index) => (
                        <div className="col-3 mb-4" key={index}>
                            <UserCard user={user} hasFollowBtn={getToken()} />
                        </div>
                    ))}
                </div>

                {pagination.size != 0 && <Pagination pagination={pagination} onChangePage={handleChangePage} />}
            </div>
        </MainLayout>
    );
};

export default UserSearchPage;
