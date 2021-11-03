import { useSelector } from 'react-redux';
import AccountLayout from '../../components/layout/AccountLayout';
import FollowingProductsCollection from '../../components/collection/FollowingProductsCollection';
import FollowingStoresCollection from '../../components/collection/FollowingStoreCollection';

const FollowingPage = (props) => {
    const user = useSelector((state) => state.account.user);
    return (
        <AccountLayout user={user}>
            <div className="account-following-page">
                <FollowingProductsCollection />
                <hr />
                <FollowingStoresCollection />
            </div>
        </AccountLayout>
    );
};

export default FollowingPage;
