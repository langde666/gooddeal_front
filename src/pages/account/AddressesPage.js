import AccountLayout from '../../components/layout/AccountLayout';
import AddressesTable from '../../components/user/table/AddressesTable';

const AddressesPage = (props) => {

    return (
        <AccountLayout>
            <div className="user-addresses-page">
                <AddressesTable />
            </div>
        </AccountLayout>
    );
};

export default AddressesPage;
