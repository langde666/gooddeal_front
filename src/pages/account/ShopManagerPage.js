import { useSelector } from 'react-redux';
import AccountLayout from '../../components/layout/AccountLayout';
import StoreManagerTable from '../../components/table/StoreManagerTable'

const ShopManagerPage = (props) => {
    const user = useSelector(state => state.account.user);
    return (
        <AccountLayout user={user}>
            <div className="account-shop-manager-page">
                <StoreManagerTable />
            </div>
        </AccountLayout>
    );
};

export default ShopManagerPage;
