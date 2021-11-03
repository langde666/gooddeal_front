import { useSelector } from 'react-redux';
import AccountLayout from '../../components/layout/AccountLayout';
import UserAddressesTable from '../../components/table/UserAddressesTable';

const AddressesPage = (props) => {
    const user = useSelector((state) => state.account.user);
    return (
        <AccountLayout user={user}>
            <div className="user-addresses-page">
                <UserAddressesTable />
            </div>
        </AccountLayout>
    );
};

export default AddressesPage;
