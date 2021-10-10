import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PrivateRoute from '../components/auth/route/PrivateRoute';
import AdminRoute from '../components/auth/route/AdminRoute';
import HomePage from './core/HomePage';
import ProductSearchPage from './core/ProductSearchPage';
import StoreSearchPage from './core/StoreSearchPage';
import UserSearchPage from './core/UserSearchPage';
import ProfilePage from './user/ProfilePage';
import AddressesPage from './user/AddressesPage';
import PurchasePage from './user/PurchasePage';
import FollowingPage from './user/FollowingPage';
import GiftWalletPage from './user/GiftWalletPage';
import GDCoinsPage from './user/GDCoinsPage';
import StoresPage from './user/StoresPage';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={HomePage} />
                <Route
                    path="/products/search"
                    exact
                    component={ProductSearchPage}
                />
                <Route
                    path="/stores/search"
                    exact
                    component={StoreSearchPage}
                />
                <Route path="/users/search" exact component={UserSearchPage} />

                <PrivateRoute path="/user/profile" exact component={ProfilePage} />
                <PrivateRoute path="/user/addresses" exact component={AddressesPage} />
                <PrivateRoute path="/user/purchase" exact component={PurchasePage} />
                <PrivateRoute path="/user/following" exact component={FollowingPage} />
                <PrivateRoute path="/user/giftWallet" exact component={GiftWalletPage} />
                <PrivateRoute path="/user/GDCoins" exact component={GDCoinsPage} />
                <PrivateRoute path="/user/stores" exact component={StoresPage} />

            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
