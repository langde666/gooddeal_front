import { useSelector } from 'react-redux';
import UserManagerLayout from '../../components/layout/UserManagerLayout';

const UserFollowingPage = (props) => {
    let user = useSelector((state) => state.user.user);

    return (
        <UserManagerLayout>
            <div className="user-following-page">
                Your following...
            </div>
        </UserManagerLayout>
    );
};

export default UserFollowingPage;
