import { useSelector } from 'react-redux';
import AccountLayout from '../../components/layout/AccountLayout';
import AddressesTable from '../../components/user/table/AddressesTable';

const AddressesPage = (props) => {
    const user = useSelector(state => state.account.user);
    return (
        <AccountLayout user={user}>
            <div className="user-addresses-page">
                <AddressesTable />
            </div>
        </AccountLayout>
    );
};

export default AddressesPage;
