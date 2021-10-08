import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getToken } from '../../../apis/auth';
import Logo from '../../ui/Logo';
import SearchBar from '../../ui/SearchBar';
import SigninItem from '../../ui/SigninItem';
import YourAccountItem from '../../ui/YourAccountItem';
import DashboardItem from '../../ui/DashboardItem';
import ShopManagerItem from '../../ui/ShopManagerItem';
import CartItem from '../../ui/CartItem';

const MainNav = (props) => {
    const role = useSelector((state) => state.user.user.role);

    return (
        <header className="cus-nav navbar fixed-top navbar-expand-lg navbar-dark bg-primary">
            <div className="container">
                <Link
                    className="navbar-brand cus-navbar-brand mx-4 ripple"
                    to="/"
                >
                    <Logo />
                </Link>

                <SearchBar />

                <ul className="nav cus-subnav mx-4">
                    {!getToken() && (
                        <li className="nav-item">
                            <SigninItem />
                        </li>
                    )}

                    {getToken() && (
                        <li className="nav-item">
                            <YourAccountItem />
                        </li>
                    )}

                    {getToken() && role == 'admin' && (
                        <li className="nav-item">
                            <DashboardItem />
                        </li>
                    )}

                    {getToken() && role == 'user' && (
                        <li className="nav-item">
                            <ShopManagerItem />
                        </li>
                    )}

                    {getToken() && role == 'user' && (
                        <li className="nav-item">
                            <CartItem />
                        </li>
                    )}

                </ul>
            </div>
        </header>
    );
};

export default MainNav;
