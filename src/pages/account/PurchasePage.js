import { useSelector } from 'react-redux';
import AccountLayout from '../../components/layout/AccountLayout';

const PurchasePage = (props) => {
    const user = useSelector((state) => state.account.user);
    return (
        <AccountLayout user={user}>
            <div className="account-purchase-page">Purchase history...</div>
        </AccountLayout>
    );
};

export default PurchasePage;
