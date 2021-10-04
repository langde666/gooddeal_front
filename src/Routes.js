import { BrowserRouter, Switch, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ProductSearchPage from './pages/ProductSearchPage';
import StoreSearchPage from './pages/StoreSearchPage';
import UserSearchPage from './pages/UserSearchPage';
import UserProfilePage from './pages/UserProfilePage';

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
                <Route path="/user/profile" exact component={UserProfilePage} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
