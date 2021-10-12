import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PrivateRoute from '../components/auth/route/PrivateRoute';
import AdminRoute from '../components/auth/route/AdminRoute';
import HomePage from './core/HomePage';
import ProductSearchPage from './core/ProductSearchPage';
import StoreSearchPage from './core/StoreSearchPage';
import UserSearchPage from './core/UserSearchPage';
import UserProfilePage from './user/UserProfilePage';
import UserAddressesPage from './user/UserAddressesPage';
import UserPurchasePage from './user/UserPurchasePage';
import UserFollowingPage from './user/UserFollowingPage';
import UserGiftWalletPage from './user/UserGiftWalletPage';
import UserGDCoinsPage from './user/UserGDCoinsPage';
import UserStoresPage from './user/UserStoresPage';
import VerifyEmailPage from './user/VerifyEmailPage';
import UserVisitPage from './user/UserVisitPage';

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

                <PrivateRoute path="/user/profile" exact component={UserProfilePage} />
                <PrivateRoute path="/user/addresses" exact component={UserAddressesPage} />
                <PrivateRoute path="/user/purchase" exact component={UserPurchasePage} />
                <PrivateRoute path="/user/following" exact component={UserFollowingPage} />
                <PrivateRoute path="/user/giftWallet" exact component={UserGiftWalletPage} />
                <PrivateRoute path="/user/GDCoins" exact component={UserGDCoinsPage} />
                <PrivateRoute path="/user/stores" exact component={UserStoresPage} />

                <Route path="/verify/email/:emailCode" exact component={VerifyEmailPage} />
                <Route path="/user/:userId" exact component={UserVisitPage} />

            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
