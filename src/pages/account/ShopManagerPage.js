import AccountLayout from '../../components/layout/AccountLayout';
import ShopsCollection from '../../components/user/table/ShopsCollection';

const ShopManagerPage = (props) => {
    return (
        <AccountLayout>
            <div className="account-shop-manager-page">
                <ShopsCollection hasHeading={true} />
            </div>
        </AccountLayout>
    );
};

export default ShopManagerPage;
