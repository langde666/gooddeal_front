import { useSelector } from 'react-redux';
import UserLayout from '../../components/layout/UserLayout';
import UserProfileInfo from '../../components/info/UserProfileInfo';
import UserJoinedInfo from '../../components/info/UserJoinedInfo';

const UserAboutPage = (props) => {
    const user = useSelector(state => state.user.user);
    return (
        <UserLayout user={user}>
            <div className="user-about-page">
                <div className="">
                    <UserProfileInfo user={user} />
                </div>
                <div className="mt-1">
                    <UserJoinedInfo user={user} />
                </div>
            </div>
        </UserLayout>
    );
}

export default UserAboutPage;