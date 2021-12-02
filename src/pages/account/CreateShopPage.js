import { useSelector } from 'react-redux';
import AccountLayout from '../../components/layout/AccountLayout';
import UserCreateShopForm from '../../components/item/form/UserCreateShopForm';

const CreateShopPage = (props) => {
    const user = useSelector((state) => state.account.user);
    return (
        <AccountLayout user={user}>
            <div className="account-create-new-shop-page">
                <UserCreateShopForm />
            </div>
        </AccountLayout>
    );
};

export default CreateShopPage;
