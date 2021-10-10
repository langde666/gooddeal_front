import { useSelector } from 'react-redux';
import UserManagerLayout from '../../components/layout/UserManagerLayout';
import Profile from '../../components/user/Profile';

const ProfilePage = (props) => {
    let user = useSelector((state) => state.user.user);

    return (
        <UserManagerLayout className="user-profile-page">
            <Profile />
        </UserManagerLayout>
    );
};

export default ProfilePage;
