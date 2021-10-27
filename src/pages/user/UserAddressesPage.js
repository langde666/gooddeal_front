import UserManagerLayout from '../../components/layout/UserManagerLayout';
import AddressesTable from '../../components/user/table/AddressesTable';

const UserAddressesPage = (props) => {

    return (
        <UserManagerLayout>
            <div className="user-addresses-page">
                <AddressesTable />
            </div>
        </UserManagerLayout>
    );
};

export default UserAddressesPage;
