import { useSelector } from 'react-redux';
import AccountLayout from '../../components/layout/AccountLayout';
import UserStoresTable from '../../components/table/UserStoresTable';

const ShopManagerPage = (props) => {
    const user = useSelector((state) => state.account.user);
    return (
        <AccountLayout user={user}>
            <div className="account-shop-manager-page mt-2">
                <UserStoresTable heading={false} />
            </div>
        </AccountLayout>
    );
};

export default ShopManagerPage;
