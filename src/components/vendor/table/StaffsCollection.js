import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Pagination from '../../ui/Pagination';
import SearchInput from '../../ui/SearchInput';
import StaffCard from '../item/StaffCard';
import AddStaffsButton from '../item/AddStaffsButton';
import CancelStaffButton from '../item/CancelStaffButton';

const StaffsCollection = (props) => {
    const { _id: userId } = useSelector(state => state.user.user);
    const { staffIds, ownerId, _id: storeId } = useSelector(state => state.store.store);

    const [listStaffs, setListStaffs] = useState([]);
    const [pagination, setPagination] = useState({
        size: 0,
    });
    const [filter, setFilter] = useState({
        search: '',
        limit: '4',
        sortBy: 'name',
        order: 'asc',
        page: 1,
    });

    useEffect(() => {
        if (!staffIds || staffIds.length <= 0) return;

        const search = filter.search.toLowerCase();
        const filterList = staffIds
            .filter(staff => (staff.firstname.toLowerCase().includes(search) || staff.lastname.toLowerCase().includes(search)))
            .sort(compareByName);

        const limit = filter.limit;
        const size = filterList.length;
        const pageCurrent = filter.page;
        const pageCount = Math.ceil(size / limit);
        let skip = limit * (pageCurrent - 1);
        if (pageCurrent > pageCount) {
            skip = (pageCount - 1) * limit;
        }

        const newListStaffs = filterList.splice(skip, skip + limit);
        setListStaffs(newListStaffs);
        setPagination({
            size,
            pageCurrent,
            pageCount,
        });

    }, [filter, staffIds]);

    const compareByName = (a, b) => {
        const nameA = (a.firstname + a.lastname).toUpperCase();
        const nameB = (b.firstname + b.lastname).toUpperCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    }

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
        <div className="staffs-collection-wrap position-relative">
            <h4 className="mb-3">Shop staffs</h4>

            <div className="d-flex justify-content-between align-items-end">
                <div className="option-wrap d-flex align-items-center">
                    <SearchInput onChange={handleChangeKeyword} />
                    <div className="ms-2">
                        {ownerId && userId === ownerId._id ? (
                            <AddStaffsButton storeId={storeId} ownerId={ownerId} staffIds={staffIds} />
                        ) : (
                            <CancelStaffButton storeId={storeId} />
                        )}
                    </div>
                </div>
                <span className="me-2">{pagination.size || 0} results</span>
            </div>

            <div className="staffs-collection-wrap row mt-3">
                {listStaffs && listStaffs.length > 0 && listStaffs.map((staff, index) => (
                    <div className="col-3 mb-4" key={index}>
                        <StaffCard user={staff} storeId={storeId} hasRemoveBtn={ownerId && ownerId._id == userId} />
                    </div>
                ))}
            </div>

            {pagination.size != 0 && <Pagination pagination={pagination} onChangePage={handleChangePage} />}
        </div>
    );
}

export default StaffsCollection;