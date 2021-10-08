import { useSelector } from 'react-redux';
import UserManagerLayout from '../../components/layout/UserManagerLayout';

const PurchasePage = (props) => {
    let user = useSelector((state) => state.user.user);

    return (
        <UserManagerLayout className="user-purchase-page">
            Purchase history
        </UserManagerLayout>
    );
};

export default PurchasePage;
