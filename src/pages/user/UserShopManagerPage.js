import UserManagerLayout from '../../components/layout/UserManagerLayout';
import ShopsCollection from '../../components/user/table/ShopsCollection';

const UserShopManagerPage = (props) => {
    return (
        <UserManagerLayout>
            <div className="user-shop-manager-page">
                <ShopsCollection hasHeading={true} />
            </div>
        </UserManagerLayout>
    );
};

export default UserShopManagerPage;
