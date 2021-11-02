import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { addStore } from '../../actions/store';
import { getToken } from '../../apis/auth';
import { listStoresByUser } from '../../apis/store';
import StoreSmallCard from '../card/StoreSmallCard';
import ManagerRoleLabel from '../label/ManagerRoleLabel';
import StoreLicenseLabel from '../label/StoreLicenseLabel';
import OpenCloseStoreButton from '../button/OpenCloseStoreButton';
import UserCreateShopItem from '../item/UserCreateShopItem';
import Pagination from '../ui/Pagination';
import SearchInput from '../ui/SearchInput';
import Loading from '../ui/Loading';
import Error from '../ui/Error';

const StoreManagerTable = (props) => {
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const [stores, setStores] = useState([]);
    const [pagination, setPagination] = useState({
        size: 0,
    });
    const [filter, setFilter] = useState({
        search: '',
        sortBy: 'rating',
        sortMoreBy: 'point',
        order: 'desc',
        limit: '6',
        page: 1,
    });

    const { _id, accessToken } = getToken();
    // const dispatch = useDispatch();

    const init = () => {
        setError('');
        setIsLoading(true);
        listStoresByUser(_id, accessToken, filter)
            .then(data => {
                if (data.error) {
                    setError(data.error);
                    setIsLoading(false);
                }
                else {
                    setStores(data.stores);
                    setPagination({
                        size: data.size,
                        pageCurrent: data.filter.pageCurrent,
                        pageCount: data.filter.pageCount,
                    });
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

    const handleChangeKeyword = (keyword) => {
        setFilter({
            ...filter,
            search: keyword,
            page: 1,
        });
    }

    const handleChangePage = (newPage) => {
        setFilter({
            ...filter,
            page: newPage,
        });
    }

    return (
        <div className="store-manager-table-wrap position-relative">
            {isloading && <Loading />}
            {error && <Error msg={error} />}

            <h4 className="mb-3">Your shops</h4>

            <div className="d-flex justify-content-between align-items-end">
                <div className="option-wrap d-flex align-items-center">
                    <SearchInput onChange={handleChangeKeyword} />
                    <div className="ms-2">
                        <UserCreateShopItem />
                    </div>
                </div>
                <span className="me-2">{pagination.size || 0} results</span>
            </div>

            <table className="store-manager-table table align-middle table-hover mt-2">
                <thead>
                    <tr>
                        <th scope="col" className="text-center">#</th>
                        <th scope="col">Shop</th>
                        <th scope="col">Role</th>
                        <th scope="col">License</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    {stores.map((store, index) => (
                        <tr key={index}>
                            <th scope="row" className="text-center">{index + 1}</th>
                            <td><StoreSmallCard store={store} /></td>
                            <td><ManagerRoleLabel role={_id == store.ownerId._id ? 'owner' : 'staff'} /></td>
                            <td><StoreLicenseLabel isActive={store.isActive} /></td>
                            <td className="text-center">
                                <div className="position-relative d-inline-block me-2">
                                    <OpenCloseStoreButton
                                        storeId={store._id}
                                        isOpen={store.isOpen}
                                        detail={false}
                                        className='cus-tooltip' />

                                    <small className="cus-tooltip-msg">
                                        {store.isOpen ? 'Click to close shop' : 'Click to open shop'}
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
                                    <small className="cus-tooltip-msg">Go to dashboard</small>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {pagination.size != 0 && <Pagination pagination={pagination} onChangePage={handleChangePage} />}
        </div>
    );
}

export default StoreManagerTable;