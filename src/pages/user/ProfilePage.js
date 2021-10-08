import { useSelector } from 'react-redux';
import UserManagerLayout from '../../components/layout/UserManagerLayout';

const ProfilePage = (props) => {
    let user = useSelector((state) => state.user.user);

    return (
        <UserManagerLayout className="user-profile-page">
            Your Profile
        </UserManagerLayout>
    );
};

export default ProfilePage;
