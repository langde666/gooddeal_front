import { useSelector } from 'react-redux';
import UserManagerLayout from '../../components/layout/UserManagerLayout';

const UserPurchasePage = (props) => {
    let user = useSelector((state) => state.user.user);

    return (
        <UserManagerLayout>
            <div className="user-purchase-page">
                Purchase history
            </div>
        </UserManagerLayout>
    );
};

export default UserPurchasePage;
