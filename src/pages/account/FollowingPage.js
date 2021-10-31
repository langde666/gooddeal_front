import AccountLayout from '../../components/layout/AccountLayout';
import FollowingProductsCollection from '../../components/user/table/FollowingProductsCollection';
import FollowingStoresCollection from '../../components/user/table/FollowingStoresCollection';

const FollowingPage = (props) => {
    return (
        <AccountLayout>
            <div className="account-following-page">
                <FollowingProductsCollection />
                <hr />
                <FollowingStoresCollection />
            </div>
        </AccountLayout>
    );
};

export default FollowingPage;
