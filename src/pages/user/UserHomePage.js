import { useSelector } from 'react-redux';
import UserLayout from '../../components/layout/UserLayout';

const UserHomePage = (props) => {
    const user = useSelector((state) => state.user.user);
    return (
        <UserLayout user={user}>
            <div className="user-home-page">
                {user && user.firstname + ' ' + user.lastname + ' home page...'}
            </div>
        </UserLayout>
    );
};

export default UserHomePage;
