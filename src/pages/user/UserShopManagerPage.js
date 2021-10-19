import UserManagerLayout from '../../components/layout/UserManagerLayout';
import CreateShopButton from '../../components/user/item/CreateShopButton';
import ShopsCollection from '../../components/user/table/ShopsCollection';

const UserShopManagerPage = (props) => {
    return (
        <UserManagerLayout>
            <div className="user-shop-manager-page">
                <CreateShopButton />

                <div className="mt-4">
                    <ShopsCollection />
                </div>
            </div>
        </UserManagerLayout>
    );
};

export default UserShopManagerPage;
