import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getToken } from '../../apis/auth';
import { removeStaff } from '../../apis/store';
import useUpdateDispatch from '../../hooks/useUpdateDispatch';
import UserSmallCard from '../card/UserSmallCard';
import StoreAddStaffItem from '../item/StoreAddStaffItem';
import CancelStaffButton from '../button/CancelStaffButton';
import Pagination from '../ui/Pagination';
import SearchInput from '../ui/SearchInput';
import Loading from '../ui/Loading';
import Error from '../ui/Error';
import Success from '../ui/Success';
import ConfirmDialog from '../ui/ConfirmDialog';
import SortByButton from './sub/SortByButton';

const StoreStaffsTable = ({ heading = true }) => {
    const [removedStaff, setRemovedStaff] = useState({});

    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isConfirming, setIsConfirming] = useState(false);

    const { _id: userId, accessToken } = getToken();
    const {
        staffIds,
        ownerId,
        _id: storeId,
    } = useSelector((state) => state.vendor.store);
    const [updateDispatch] = useUpdateDispatch();

    const [listStaffs, setListStaffs] = useState([]);
    const [pagination, setPagination] = useState({
        size: 0,
    });
    const [filter, setFilter] = useState({
        search: '',
        limit: 6,
        sortBy: 'name',
        order: 'asc',
        page: 1,
    });

    useEffect(() => {
        if (!staffIds || staffIds.length <= 0) {
            setListStaffs([]);
            setPagination({
                ...pagination,
                size: 0,
            });
            return;
        }

        const search = filter.search.toLowerCase();
        const filterList = staffIds
            .filter(
                (staff) =>
                    staff.firstname.toLowerCase().includes(search) ||
                    staff.lastname.toLowerCase().includes(search),
            )
            .sort(compareFunc(filter.sortBy, filter.order));


        const limit = filter.limit;
        const size = filterList.length;
        const pageCurrent = filter.page;
        const pageCount = Math.ceil(size / limit);
        let skip = limit * (pageCurrent - 1);
        if (pageCurrent > pageCount) {
            skip = (pageCount - 1) * limit;
        }

        const newListStaffs = filterList.slice(skip, skip + limit);
        setListStaffs(newListStaffs);
        setPagination({
            size,
            pageCurrent,
            pageCount,
        });
    }, [filter, staffIds]);

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
    }

    const handleRemoveStaff = (staff) => {
        setRemovedStaff(staff);
        setIsConfirming(true);
    };

    const onRemoveSubmitStaff = () => {
        const staff = removedStaff._id;
        setError('');
        setSuccess('');
        setIsLoading(true);
        removeStaff(userId, accessToken, staff, storeId)
            .then((data) => {
                if (data.error) {
                    setError(data.error);
                    setTimeout(() => {
                        setError('');
                    }, 3000);
                } else {
                    updateDispatch('vendor', data.store);
                    setSuccess(data.success);
                    setTimeout(() => {
                        setSuccess('');
                    }, 3000);
                }
                setIsLoading(false);
            })
            .catch((error) => {
                setIsLoading(false);
                setError('Server Error');
                setTimeout(() => {
                    setError('');
                }, 3000);
            });
    };

    return (
        <div className="store-staffs-table-wrap position-relative">
            {isloading && <Loading />}
            {isConfirming && (
                <ConfirmDialog
                    title="Remove staff"
                    color="danger"
                    message={
                        <span className="mt-2 d-block">
                            Are you sure you want to remove{' '}
                            <UserSmallCard user={removedStaff} /> ?
                        </span>
                    }
                    onSubmit={onRemoveSubmitStaff}
                    onClose={() => setIsConfirming(false)}
                />
            )}

            {heading && <h4 className="mb-3">Shop staffs</h4>}

            {error && <Error msg={error} />}
            {success && <Success msg={success} />}

            <div className="d-flex justify-content-between align-items-end">
                <div className="option-wrap d-flex align-items-center">
                    <SearchInput onChange={handleChangeKeyword} />
                    <div className="ms-2">
                        {ownerId && userId == ownerId._id ? (
                            <StoreAddStaffItem
                                storeId={storeId}
                                owner={ownerId}
                                staffs={staffIds}
                            />
                        ) : (
                            <CancelStaffButton storeId={storeId} />
                        )}
                    </div>
                </div>
                <span className="me-2">{pagination.size || 0} results</span>
            </div>

            <table className="store-staffs-table table align-middle table-hover mt-2 table-sm">
                <thead>
                    <tr>
                        <th scope="col" className="text-center">
                            <SortByButton
                                currentSortBy={filter.sortBy}
                                title="#"
                                sortBy='_id'
                                onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                            />
                        </th>
                        <th scope="col">
                            <SortByButton
                                currentSortBy={filter.sortBy}
                                title="Staff"
                                sortBy='name'
                                onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                            />
                        </th>
                        <th scope="col">
                            <SortByButton
                                currentSortBy={filter.sortBy}
                                title="Id card"
                                sortBy='id_card'
                                onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                            />
                        </th>
                        <th scope="col">
                            <SortByButton
                                currentSortBy={filter.sortBy}
                                title="Email"
                                sortBy='email'
                                onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                            />
                        </th>
                        <th scope="col">
                            <SortByButton
                                currentSortBy={filter.sortBy}
                                title="Phone"
                                sortBy='phone'
                                onSet={(order, sortBy) => handleSetSortBy(order, sortBy)}
                            />
                        </th>
                        {ownerId && userId == ownerId._id && (
                            <th scope="col"></th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {listStaffs.map((staff, index) => (
                        <tr key={index}>
                            <th scope="row" className="text-center">
                                {index + 1}
                            </th>
                            <td>
                                <UserSmallCard user={staff} />
                            </td>
                            <td>{staff.id_card || '-'}</td>
                            <td>{staff.email || '-'}</td>
                            <td>{staff.phone || '-'}</td>
                            {ownerId && userId == ownerId._id && (
                                <td className="text-center">
                                    <div className="position-relative d-inline-block">
                                        <button
                                            type="button"
                                            className="btn btn-outline-danger ripple cus-tooltip"
                                            onClick={() =>
                                                handleRemoveStaff(staff)
                                            }
                                        >
                                            <i className="fas fa-trash-alt"></i>
                                        </button>
                                        <small className="cus-tooltip-msg">
                                            Remove staff
                                        </small>
                                    </div>
                                </td>
                            )}
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

export default StoreStaffsTable;


const compareFunc = (sortBy, order) => {
    return (a, b) => {
        let valueA = sortBy !== 'name' ? a[sortBy] : (a.firstname + a.lastname).toLowerCase();
        let valueB = sortBy !== 'name' ? b[sortBy] : (b.firstname + b.lastname).toLowerCase();

        if (typeof valueA === 'undefined') valueA = '';
        if (typeof valueB === 'undefined') valueB = '';

        if (order == 'asc')
            if (valueA < valueB) return -1;
            else if (valueA > valueB) return 1;
            else return 0;
        else
            if (valueA < valueB) return 1;
            else if (valueA > valueB) return -1;
            else return 0;

    }
}