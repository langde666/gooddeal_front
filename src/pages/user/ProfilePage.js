import UserManagerLayout from '../../components/layout/UserManagerLayout';
import UserProfile from '../../components/user/UserProfile';

const ProfilePage = (props) => {
    return (
        <UserManagerLayout className="user-profile-page">
            <UserProfile />
        </UserManagerLayout>
    );
};

export default ProfilePage;
