import { useSelector } from 'react-redux';
import UserManagerLayout from '../../components/layout/UserManagerLayout';

const UserGDCoinsPage = (props) => {
    let user = useSelector((state) => state.user.user);

    return (
        <UserManagerLayout>
            <div className="user-gd-coins-page">
                Your GD Coins...
            </div>
        </UserManagerLayout>
    );
};

export default UserGDCoinsPage;
