import { useSelector } from 'react-redux';
import UserManagerLayout from '../../components/layout/UserManagerLayout';

const UserGiftWalletPage = (props) => {
    let user = useSelector((state) => state.user.user);

    return (
        <UserManagerLayout>
            <div className="user-gift-wallet-page">
                Your Gifts...
            </div>
        </UserManagerLayout>
    );
};

export default UserGiftWalletPage;
