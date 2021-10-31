import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PrivateRoute from '../components/route/PrivateRoute';
import AdminRoute from '../components/route/AdminRoute';
//core
import HomePage from './core/HomePage';
import ProductSearchPage from './core/ProductSearchPage';
import StoreSearchPage from './core/StoreSearchPage';
import UserSearchPage from './core/UserSearchPage';
//admin
import AdminDashboardPage from './admin/DashboardPage';
//account
import AccountProfilePage from './account/ProfilePage';
import AccountAddressesPage from './account/AddressesPage';
import AccountPurchasePage from './account/PurchasePage';
import AccountFollowingPage from './account/FollowingPage';
import AccountGiftWalletPage from './account/GiftWalletPage';
import AccountGDCoinsPage from './account/GDCoinsPage';
import AccountShopManagerPage from './account/ShopManagerPage';
import AccountVerifyEmailPage from './account/VerifyEmailPage';
//vendor
import VendorProfilePage from './vendor/ProfilePage';
import VendorDashboardPage from './vendor/DashboardPage';
import VendorProductsPage from './vendor/ProductsPage';
import VendorOrdersPage from './vendor/OrdersPage';
import VendorStaffsPage from './vendor/StaffsPage';
import VendorGiftsPage from './vendor/GiftsPage';
import VendorGDCoinsPage from './vendor/GDCoinsPage';
//user
import UserHomePage from './user/UserHomePage';
import UserAboutPage from './user/UserAboutPage';
//store
import StoreHomePage from './store/HomePage';
import StoreAboutPage from './store/AboutPage';
import StoreCollectionPage from './store/CollectionPage';
//product

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

                <AdminRoute path="/admin/dashboard" exact component={AdminDashboardPage} />

                <PrivateRoute path="/account/profile" exact component={AccountProfilePage} />
                <PrivateRoute path="/account/addresses" exact component={AccountAddressesPage} />
                <PrivateRoute path="/account/purchase" exact component={AccountPurchasePage} />
                <PrivateRoute path="/account/following" exact component={AccountFollowingPage} />
                <PrivateRoute path="/account/giftWallet" exact component={AccountGiftWalletPage} />
                <PrivateRoute path="/account/GDCoins" exact component={AccountGDCoinsPage} />
                <PrivateRoute path="/account/shopManager" exact component={AccountShopManagerPage} />
                <Route path="/verify/email/:emailCode" exact component={AccountVerifyEmailPage} />

                <PrivateRoute path="/vendor/:storeId" exact component={VendorDashboardPage} />
                <PrivateRoute path="/vendor/profile/:storeId" exact component={VendorProfilePage} />
                <PrivateRoute path="/vendor/products/:storeId" exact component={VendorProductsPage} />
                <PrivateRoute path="/vendor/orders/:storeId" exact component={VendorOrdersPage} />
                <PrivateRoute path="/vendor/staffs/:storeId" exact component={VendorStaffsPage} />
                <PrivateRoute path="/vendor/gifts/:storeId" exact component={VendorGiftsPage} />
                <PrivateRoute path="/vendor/GDCoins/:storeId" exact component={VendorGDCoinsPage} />

                <Route path="/user/:userId" exact component={UserHomePage} />
                <Route path="/user/about/:userId" exact component={UserAboutPage} />

                <Route path="/store/:storeId" exact component={StoreHomePage} />
                <Route path="/store/collection/:storeId" exact component={StoreCollectionPage} />
                <Route path="/store/about/:storeId" exact component={StoreAboutPage} />

            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
