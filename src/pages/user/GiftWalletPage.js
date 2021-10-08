import { useSelector } from 'react-redux';
import UserManagerLayout from '../../components/layout/UserManagerLayout';

const GiftWalletPage = (props) => {
    let user = useSelector((state) => state.user.user);

    return (
        <UserManagerLayout className="user-gift-wallet-page">
            Your Gifts...
        </UserManagerLayout>
    );
};

export default GiftWalletPage;
