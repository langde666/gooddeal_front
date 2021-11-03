import { useSelector } from 'react-redux';
import AccountLayout from '../../components/layout/AccountLayout';

const GDCoinsPage = (props) => {
    const user = useSelector((state) => state.account.user);
    return (
        <AccountLayout user={user}>
            <div className="account-gd-coins-page">Your GD Coins...</div>
        </AccountLayout>
    );
};

export default GDCoinsPage;
