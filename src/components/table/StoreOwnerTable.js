// import { useSelector } from 'react-redux';
import UserSmallCard from '../card/UserSmallCard';

const StoreOwnerTable = ({ ownerId = {} }) => {
    // const { ownerId } = useSelector((state) => state.vendor.store);
    return (
        <div className="store-owner-table-wrap position-relative">
            <h4 className="mb-2">Shop owner</h4>

            <table className="store-staffs-table table align-middle table-hover mt-2 table-sm text-center">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Owner</th>
                        <th scope="col">Id card</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {ownerId && (
                        <tr>
                            <th scope="row">1</th>
                            <td>
                                <UserSmallCard user={ownerId} />
                            </td>
                            <td>
                                <small>{ownerId.id_card || '-'}</small>
                            </td>
                            <td>
                                <small>{ownerId.email || '-'}</small>
                            </td>
                            <td>
                                <small>{ownerId.phone || '-'}</small>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default StoreOwnerTable;
