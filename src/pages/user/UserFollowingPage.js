import { useSelector } from 'react-redux';
import UserManagerLayout from '../../components/layout/UserManagerLayout';

const UserFollowingPage = (props) => {
    let user = useSelector((state) => state.user.user);

    return (
        <UserManagerLayout className="user-following-page">
            Your following...
        </UserManagerLayout>
    );
};

export default UserFollowingPage;
