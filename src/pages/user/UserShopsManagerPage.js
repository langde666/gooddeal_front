import { useSelector } from 'react-redux';
import UserManagerLayout from '../../components/layout/UserManagerLayout';
import UserShopManagerNav from '../../components/layout/nav/UseShopManagerNav';
import CreateShopButton from '../../components/user/item/CreateShopButton';

const UserShopsManagerPage = (props) => {
    let user = useSelector((state) => state.user.user);

    return (
        <UserManagerLayout>
            <div className="user-shops-page">
                <div className="" style={{ margin: '-1rem -1rem 1rem' }}>
                    <UserShopManagerNav />
                </div>

                <CreateShopButton />

                {/* <div className="mt-3">
                    <ShopsTable
                        listShops={shops}
                    />
                </div> */}
            </div>
        </UserManagerLayout>
    );
};

export default UserShopsManagerPage;
