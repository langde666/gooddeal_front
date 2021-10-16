import { useSelector } from 'react-redux';
import UserManagerLayout from '../../components/layout/UserManagerLayout';
import AddAddressButton from '../../components/user/item/AddAddressButton';
import AddressesTable from '../../components/user/table/AddressesTable';

const UserAddressesPage = (props) => {
    let { addresses } = useSelector(state => state.user.user);

    return (
        <UserManagerLayout>
            <div className="user-addresses-page mt-2">
                <AddAddressButton
                    count={addresses && addresses.length}
                />

                <div className="mt-3">
                    <AddressesTable
                        listAddresses={addresses}
                    />
                </div>
            </div>
        </UserManagerLayout>
    );
};

export default UserAddressesPage;
