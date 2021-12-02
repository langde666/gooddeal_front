import { useSelector } from 'react-redux';
import AdminLayout from '../../components/layout/AdminLayout';
import TransactionsTable from '../../components/table/TransactionsTable';

const TransactionPage = (props) => {
    const user = useSelector((state) => state.account.user);
    return (
        <AdminLayout user={user}>
            <div className="admin-styles-manager-page">
                <TransactionsTable />
            </div>
        </AdminLayout>
    );
};

export default TransactionPage;
