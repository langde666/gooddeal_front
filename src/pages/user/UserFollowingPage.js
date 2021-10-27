import UserManagerLayout from '../../components/layout/UserManagerLayout';
import FollowingProductsCollection from '../../components/user/table/FollowingProductsCollection';
import FollowingStoresCollection from '../../components/user/table/FollowingStoresCollection';

const UserFollowingPage = (props) => {
    return (
        <UserManagerLayout>
            <div className="user-following-page position-relative">
                <FollowingProductsCollection />
                <hr />
                <FollowingStoresCollection />
            </div>
        </UserManagerLayout>
    );
};

export default UserFollowingPage;
