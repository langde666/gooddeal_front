import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getToken } from '../../../apis/auth';
import Logo from './Logo';
import SearchBar from './SearchBar';
import SigninItem from '../../item/SigninItem';
import AccountInit from '../../init/AccountInit';
import VendorInit from '../../init/VendorInit';

const MainNav = ({ navFor = 'user' }) => {
    const { role, cart } = useSelector((state) => state.account.user);
    const count =
        cart && cart.length > 0
            ? cart.reduce(
                  (count, product) => count + product && product.count,
                  0,
              )
            : 0;

    return (
        <header className="main-nav cus-nav navbar fixed-top navbar-expand-lg navbar-dark bg-primary">
            <div className="container px-0">
                <Link
                    className="navbar-brand cus-navbar-brand me-4 ripple"
                    to="/"
                >
                    <Logo />
                </Link>

                {navFor == 'user' && <SearchBar />}
                {navFor != 'user' && (
                    <h1 className="logo text-white text-center m-0">
                        {navFor} dashboard
                    </h1>
                )}

                <ul className="nav cus-subnav ms-4 d-flex justify-content-end">
                    {!getToken() && (
                        <li className="nav-item">
                            <SigninItem />
                        </li>
                    )}

                    {getToken() && (
                        <li className="nav-item">
                            <AccountInit />
                        </li>
                    )}

                    {navFor == 'vendor' && getToken() && (
                        <li className="nav-item">
                            <VendorInit />
                        </li>
                    )}

                    {navFor == 'user' && getToken() && (
                        <li className="nav-item position-relative">
                            <Link
                                className="btn btn-outline-light cus-outline ripple cus-tooltip"
                                to="/account/following"
                            >
                                <i className="fas fa-heart"></i>
                                {/* <i className="fas fa-heart" style={{ color: '#ed4956' }}></i> */}
                            </Link>
                            <small className="cus-tooltip-msg">Following</small>
                        </li>
                    )}

                    {navFor == 'user' && getToken() && role == 'user' && (
                        <li className="nav-item position-relative">
                            <Link
                                className="btn btn-outline-light cus-outline ripple cus-tooltip"
                                to="/account/shopManager"
                            >
                                <i className="fas fa-store"></i>
                            </Link>
                            <small className="cus-tooltip-msg">
                                Shop Manager
                            </small>
                        </li>
                    )}

                    {navFor == 'user' && getToken() && role == 'user' && (
                        <li className="nav-item">
                            <div className="cart-item-wrap position-relative">
                                <Link
                                    className="btn btn-outline-light cus-outline ripple cus-tooltip"
                                    to="/cart"
                                >
                                    <i className="fas fa-shopping-basket"></i>
                                </Link>
                                {
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-info cus-tooltip">
                                        {count < 10 ? count : '9+'}
                                        <span className="visually-hidden">
                                            products
                                        </span>
                                    </span>
                                }
                                <small className="cus-tooltip-msg">Cart</small>
                            </div>
                        </li>
                    )}

                    {navFor == 'user' && getToken() && role == 'admin' && (
                        <li className="nav-item position-relative">
                            <Link
                                className="btn btn-outline-light cus-outline ripple cus-tooltip"
                                to="/admin/dashboard"
                            >
                                <i className="fas fa-user-tie"></i>
                            </Link>
                            <small className="cus-tooltip-msg">Dashboard</small>
                        </li>
                    )}

                    {navFor != 'user' && getToken() && (
                        <li className="nav-item position-relative">
                            <Link
                                className="btn btn-outline-light cus-outline ripple cus-tooltip"
                                to="/"
                            >
                                <i className="fas fa-home"></i>
                            </Link>
                            <small className="cus-tooltip-msg">
                                Back to GoodDeal!
                            </small>
                        </li>
                    )}
                </ul>
            </div>
        </header>
    );
};

export default MainNav;
