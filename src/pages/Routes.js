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
import UserShopManagerPage from './user/UserShopManagerPage';
import VerifyEmailPage from './user/VerifyEmailPage';
import UserVisitPage from './user/UserVisitPage';
import ShopProfilePage from './vendor/ShopProfilePage';
import ShopDashboardPage from './vendor/ShopDashboardPage';
import ShopProductsPage from './vendor/ShopProductsPage';
import ShopOrdersPage from './vendor/ShopOrdersPage';
import ShopStaffsPage from './vendor/ShopStaffsPage';
import ShopGiftsPage from './vendor/ShopGiftsPage';
import ShopGDCoinsPage from './vendor/ShopGDCoinsPage';

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
                <PrivateRoute path="/user/shopManager" exact component={UserShopManagerPage} />

                <Route path="/verify/email/:emailCode" exact component={VerifyEmailPage} />
                <Route path="/user/:userId" exact component={UserVisitPage} />

                <PrivateRoute path="/vendor/:storeId" exact component={ShopDashboardPage} />
                <PrivateRoute path="/vendor/profile/:storeId" exact component={ShopProfilePage} />
                <PrivateRoute path="/vendor/products/:storeId" exact component={ShopProductsPage} />
                <PrivateRoute path="/vendor/orders/:storeId" exact component={ShopOrdersPage} />
                <PrivateRoute path="/vendor/staffs/:storeId" exact component={ShopStaffsPage} />
                <PrivateRoute path="/vendor/gifts/:storeId" exact component={ShopGiftsPage} />
                <PrivateRoute path="/vendor/GDCoins/:storeId" exact component={ShopGDCoinsPage} />

            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
