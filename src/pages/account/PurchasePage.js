import { useSelector } from 'react-redux';
import AccountLayout from '../../components/layout/AccountLayout';
import UserOrdersTable from '../../components/table/UserOrdersTable';

const PurchasePage = (props) => {
    const user = useSelector((state) => state.account.user);
    return (
        <AccountLayout user={user}>
            <UserOrdersTable />
        </AccountLayout>
    );
};

export default PurchasePage;
