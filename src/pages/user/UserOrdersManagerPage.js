import { useSelector } from 'react-redux';
import UserManagerLayout from '../../components/layout/UserManagerLayout';
import UserShopManagerNav from '../../components/layout/nav/UseShopManagerNav';

const UserOrdersManagerPage = (props) => {
    let user = useSelector((state) => state.user.user);

    return (
        <UserManagerLayout>
            <div className="user-stores-page">
                <div className="" style={{ margin: '-1rem -1rem 1rem' }}>
                    <UserShopManagerNav />
                </div>

                ...Orders manager
            </div>
        </UserManagerLayout>
    );
};

export default UserOrdersManagerPage;
