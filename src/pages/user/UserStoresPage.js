import { useSelector } from 'react-redux';
import UserManagerLayout from '../../components/layout/UserManagerLayout';

const UserStoresPage = (props) => {
    let user = useSelector((state) => state.user.user);

    return (
        <UserManagerLayout className="user-stores-page">
            Your Stores...
        </UserManagerLayout>
    );
};

export default UserStoresPage;
