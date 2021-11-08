import { useSelector } from 'react-redux';
import UserSmallCard from '../card/UserSmallCard';

const StoreOwnerTable = (props) => {
    const { ownerId } = useSelector((state) => state.vendor.store);
    return (
        <div className="store-owner-table-wrap position-relative">
            <h4 className="mb-2">Shop owner</h4>

            <table className="store-staffs-table table align-middle table-hover mt-2 table-sm">
                <thead>
                    <tr>
                        <th scope="col" className="text-center">
                            #
                        </th>
                        <th scope="col">Owner</th>
                        <th scope="col">Id card</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {ownerId && (
                        <tr>
                            <th scope="row" className="text-center">
                                1
                            </th>
                            <td>
                                <UserSmallCard user={ownerId} />
                            </td>
                            <td>{ownerId.id_card || '-'}</td>
                            <td>{ownerId.email || '-'}</td>
                            <td>{ownerId.phone || '-'}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default StoreOwnerTable;
