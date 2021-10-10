import { useSelector } from 'react-redux';
import UserManagerLayout from '../../components/layout/UserManagerLayout';

const AddressesPage = (props) => {
    let user = useSelector((state) => state.user.user);

    return (
        <UserManagerLayout className="user-addresses-page">
            Addresses List...
        </UserManagerLayout>
    );
};

export default AddressesPage;
