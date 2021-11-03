import { useSelector } from 'react-redux';
import AccountLayout from '../../components/layout/AccountLayout';

const GiftWalletPage = (props) => {
    const user = useSelector((state) => state.account.user);
    return (
        <AccountLayout user={user}>
            <div className="account-gift-wallet-page">Your Gifts...</div>
        </AccountLayout>
    );
};

export default GiftWalletPage;
