import { useSelector } from 'react-redux';
import UserManagerLayout from '../../components/layout/UserManagerLayout';

const AccountPage = (props) => {
    let user = useSelector((state) => state.user.user);

    return (
        <UserManagerLayout className="user-account-page">
            Your Account...
        </UserManagerLayout>
    );
};

export default AccountPage;
