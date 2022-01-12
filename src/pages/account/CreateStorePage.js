import { useSelector } from 'react-redux';
import AccountLayout from '../../components/layout/AccountLayout';
import UserCreatetoreForm from '../../components/item/form/UserCreateStoreForm';

const CreateStorePage = (props) => {
    const user = useSelector((state) => state.account.user);
    return (
        <AccountLayout user={user}>
            <UserCreatetoreForm />
        </AccountLayout>
    );
};

export default CreateStorePage;
