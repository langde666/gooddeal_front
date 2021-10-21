import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getToken } from '../../../apis/auth';
import { getlistUsers } from '../../../apis/user';
import { addStaffs } from '../../../apis/store';
import { addStore } from '../../../actions/store';
import UserSmallCard from '../../user/item/UserSmallCard';
import SearchInput from '../../ui/SearchInput';
import Loading from '../../ui/Loading';
import Error from '../../ui/Error';
import Success from '../../ui/Success';
import ConfirmDialog from '../../ui/ConfirmDialog';

const AddStaffsForm = ({ storeId, ownerId, staffIds }) => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isloading, setIsLoading] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);

    const [filter, setFilter] = useState({});
    const [pagination, setPagination] = useState({});
    const [listUsers, setListUsers] = useState([]);
    const [listLeft, setListLeft] = useState([]);
    const [listRight, setListRight] = useState([]);
    const dispatch = useDispatch();

    const init = () => {
        getlistUsers(filter)
            .then(data => {
                if (data.error) {
                    return;
                }
                else {
                    setPagination({
                        size: data.size,
                        pageCurrent: data.filter.pageCurrent,
                        pageCount: data.filter.pageCount,
                    });

                    if (filter.page == 1) {
                        setListUsers(data.users);
                    }
                    else {
                        setListUsers([
                            ...listUsers,
                            ...data.users,
                        ]);
                    }
                }
            })
            .catch(error => {
                return;
            });
    }

    useEffect(() => {
        setFilter({
            search: '',
            sortBy: 'point',
            role: 'customer',
            order: 'desc',
            limit: '3',
            page: 1,
        });
    }, [storeId, ownerId, staffIds]);

    useEffect(() => {
        init();
    }, [filter]);

    useEffect(() => {
        const listCurrentStaffs = staffIds.map(s => s._id);
        const listCurrentRight = listRight.map(r => r._id);
        setListLeft(listUsers.filter(u => u._id != ownerId._id
            && listCurrentStaffs.indexOf(u._id) == -1
            && listCurrentRight.indexOf(u._id) == -1));
    }, [listUsers]);

    const handleChangeKeyword = (keyword) => {
        setFilter({
            ...filter,
            search: keyword,
            page: 1,
        });
    }

    const handleLoadMore = () => {
        setFilter({
            ...filter,
            page: filter.page + 1,
        });
    }

    const handleAddBtn = (user) => {
        setListRight([
            ...listRight,
            user,
        ]);

        setListLeft(listLeft.filter(u => u._id != user._id));
    }

    const handleRemoveBtn = (user) => {
        setListLeft([
            ...listLeft,
            user,
        ]);

        setListRight(listRight.filter(u => u._id != user._id));
    }

    const handleSubmit = () => {
        setIsConfirming(true);
    }

    const onSubmit = () => {
        const staffs = listRight.map(r => r._id);
        const { _id, accessToken } = getToken();

        setError('');
        setSuccess('');
        setIsLoading(true);
        addStaffs(_id, accessToken, staffs, storeId)
            .then(data => {
                if (data.error) {
                    setError(data.error);
                    setIsLoading(false);
                    setTimeout(() => {
                        setError('');
                    }, 3000);
                }
                else {
                    setListRight([]);
                    dispatch(addStore(data.store));
                    setSuccess(data.success);
                    setIsLoading(false);
                    setTimeout(() => {
                        setSuccess('');
                    }, 3000);
                }
            })
            .catch(error => {
                setError('Server Error');
                setIsLoading(false);
                setTimeout(() => {
                    setError('');
                }, 3000);
            });
    }

    return (
        <div className="add-staffs-form-wrap row mt-2 position-relative">
            {isloading && <Loading />}
            {error && <Error msg={error} />}
            {success && <Success msg={success} />}
            {isConfirming && <ConfirmDialog
                title='Add staffs'
                message={listRight && listRight.map((user, index) => (
                    <div className='my-3' key={index} style={{ maxWidth: '60%' }}>
                        <UserSmallCard user={user} />
                    </div>
                ))}
                onSubmit={onSubmit}
                onClose={() => setIsConfirming(false)}
            />}

            <div className="col-12 mb-2">
                <div className="row">
                    <div className="col-6">
                        <SearchInput onChange={handleChangeKeyword} />
                    </div>
                </div>
            </div>

            <div className="col-6">
                <div className="border border-primary rounded p-2 cus-group">
                    {listLeft && listLeft.map((user, index) => (
                        <div key={index} className="d-flex align-items-center">
                            <div className="flex-grow-1">
                                <UserSmallCard isSmall={true} user={user} />
                            </div>
                            <button
                                type="button"
                                className="btn btn-primary btn-sm ripple"
                                onClick={() => handleAddBtn(user)}
                            >
                                <i className="fas fa-arrow-alt-circle-right"></i>
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="col-6">
                <div className="border border-primary rounded p-2 cus-group">
                    {listRight && listRight.map((user, index) => (
                        <div key={index} className="d-flex align-items-center">
                            <div className="flex-grow-1">
                                <UserSmallCard isSmall={true} user={user} />
                            </div>
                            <button
                                type="button"
                                className="btn btn-outline-danger btn-sm ripple"
                                onClick={() => handleRemoveBtn(user)}
                            >
                                <i className="fas fa-times-circle"></i>
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="col-12 mt-2">
                <div className="row">
                    <div className="col d-flex justify-content-center">
                        <button
                            type="button"
                            disabled={pagination && pagination.pageCount > pagination.pageCurrent ? false : true}
                            className="btn btn-primary ripple"
                            onClick={handleLoadMore}
                        >
                            <i className="fas fa-arrow-alt-circle-down me-1"></i> Load more
                        </button>
                    </div>

                    <div className="col d-flex justify-content-center">
                        <button
                            type="button"
                            className="btn btn-primary ripple"
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddStaffsForm;