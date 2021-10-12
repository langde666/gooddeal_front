import { useSelector } from 'react-redux';
import UserManagerLayout from '../../components/layout/UserManagerLayout';
import AddAddressItem from '../../components/ui/AddAddressItem';
import AddressesTable from '../../components/ui/AddressesTable';

const UserAddressesPage = (props) => {
    let { addresses } = useSelector(state => state.user.user);

    return (
        <UserManagerLayout>
            <div className="user-addresses-page mt-2">
                <AddAddressItem
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
