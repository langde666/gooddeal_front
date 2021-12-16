import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getToken, signout } from '../../../apis/auth';
import Logo from './Logo';
import SearchBar from './SearchBar';
import SigninItem from '../../item/SigninItem';
import AccountInit from '../../init/AccountInit';
import VendorInit from '../../init/VendorInit';
import UserSmallCard from '../../card/UserSmallCard';
import StoreSmallCard from '../../card/StoreSmallCard';
import ConfirmDialog from '../../ui/ConfirmDialog';

const MainNav = ({ navFor = 'user' }) => {
    const { cartCount } = useSelector((state) => state.account.user);
    const user = useSelector((state) => state.account.user);
    const store = useSelector((state) => state.vendor.store);

    const [isConfirming, setIsConfirming] = useState(false);
    const history = useHistory();
    const { refreshToken } = getToken();

    const handleSignout = () => {
        setIsConfirming(true);
    };

    const onSignoutSubmit = () => {
        signout(refreshToken, () => {
            history.go(0);
        });
    };

    return (
        <header className="main-nav cus-nav navbar fixed-top navbar-expand-lg navbar-dark bg-primary">
            {isConfirming && (
                <ConfirmDialog
                    title="Sign out"
                    color="danger"
                    onSubmit={onSignoutSubmit}
                    onClose={() => setIsConfirming(false)}
                />
            )}

            <div className="container-lg">
                <Link
                    className="navbar-brand cus-navbar-brand me-4 ripple res-hide-lg"
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

                {!getToken() ? (
                    <ul
                        className="nav cus-subnav ms-4"
                        style={{ minWidth: 'unset' }}
                    >
                        <li className="nav-item">
                            <SigninItem />
                        </li>
                    </ul>
                ) : (
                    <>
                        <ul className="nav cus-subnav ms-4 d-flex justify-content-end res-hide-lg">
                            <li className="nav-item">
                                <AccountInit />
                            </li>

                            {navFor === 'vendor' && (
                                <li className="nav-item">
                                    <VendorInit />
                                </li>
                            )}

                            {navFor === 'user' && (
                                <li className="nav-item position-relative">
                                    <Link
                                        className="btn btn-outline-light cus-outline ripple cus-tooltip"
                                        to="/account/following"
                                    >
                                        <i className="fas fa-heart"></i>
                                        {/* <i className="fas fa-heart" style={{ color: '#ed4956' }}></i> */}
                                    </Link>
                                    <small className="cus-tooltip-msg">
                                        Following
                                    </small>
                                </li>
                            )}

                            {navFor === 'user' && getToken().role === 'user' && (
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

                            {navFor === 'user' && getToken().role === 'user' && (
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
                                                {cartCount < 10
                                                    ? cartCount
                                                    : '9+'}
                                                <span className="visually-hidden">
                                                    products
                                                </span>
                                            </span>
                                        }
                                        <small className="cus-tooltip-msg">
                                            Cart
                                        </small>
                                    </div>
                                </li>
                            )}

                            {navFor === 'user' && getToken().role === 'admin' && (
                                <li className="nav-item position-relative">
                                    <Link
                                        className="btn btn-outline-light cus-outline ripple cus-tooltip"
                                        to="/admin/dashboard"
                                    >
                                        <i className="fas fa-user-tie"></i>
                                    </Link>
                                    <small className="cus-tooltip-msg">
                                        Dashboard
                                    </small>
                                </li>
                            )}

                            {navFor !== 'user' && (
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

                        <button
                            className="navbar-toggler ms-4 d-none res-dis-lg"
                            type="button"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasNavbar"
                            aria-controls="offcanvasNavbar"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div
                            className="offcanvas offcanvas-end d-none res-dis-lg"
                            tabIndex="-1"
                            id="offcanvasNavbar"
                            aria-labelledby="offcanvasNavbarLabel"
                            style={{ flexGrow: 'unset', width: 'unset' }}
                        >
                            <div className="offcanvas-header bg-primary">
                                <h5
                                    className="offcanvas-title bg-primary"
                                    id="offcanvasNavbarLabel"
                                >
                                    <Logo />
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close btn-close-white text-reset"
                                    data-bs-dismiss="offcanvas"
                                    aria-label="Close"
                                ></button>
                            </div>

                            <div className="offcanvas-body">
                                <UserSmallCard
                                    user={user}
                                    link="/account/profile"
                                />

                                {navFor === 'vendor' && (
                                    <div className="mt-2">
                                        <StoreSmallCard
                                            store={store}
                                            link={`/vendor/${store._id}`}
                                        />
                                    </div>
                                )}

                                <ul className="navbar-nav justify-content-end flex-grow-1 mt-3">
                                    <li className="nav-item p-2">
                                        <Link
                                            className="link-hover link-dark d-block"
                                            to="/"
                                        >
                                            <i className="fas fa-home me-2"></i>
                                            Home
                                        </Link>
                                    </li>

                                    {navFor === 'user' && (
                                        <li className="nav-item p-2">
                                            <Link
                                                className="link-hover link-dark d-block"
                                                to="/account/following"
                                            >
                                                <i className="fas fa-heart me-2"></i>
                                                Following
                                            </Link>
                                        </li>
                                    )}

                                    {getToken().role === 'user' && (
                                        <li className="nav-item p-2">
                                            <Link
                                                className="link-hover link-dark d-block"
                                                to="/account/shopManager"
                                            >
                                                <i className="fas fa-store me-2"></i>
                                                Shop Manager
                                            </Link>
                                        </li>
                                    )}

                                    {navFor === 'user' &&
                                        getToken().role === 'user' && (
                                            <li className="nav-item p-2">
                                                <Link
                                                    className="link-hover link-dark d-block"
                                                    to="/cart"
                                                >
                                                    <i className="fas fa-shopping-basket me-2"></i>
                                                    Cart
                                                </Link>
                                            </li>
                                        )}

                                    {navFor === 'user' &&
                                        getToken().role === 'admin' && (
                                            <li className="nav-item p-2">
                                                <Link
                                                    className="link-hover link-dark d-block"
                                                    to="/admin/dashboard"
                                                >
                                                    <i className="fas fa-user-tie me-2"></i>
                                                    Dashboard
                                                </Link>
                                            </li>
                                        )}

                                    <li
                                        className="nav-item p-2 link-hover link-dark ms-1"
                                        onClick={handleSignout}
                                    >
                                        <i className="fas fa-sign-out-alt me-2"></i>
                                        Sign out
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </header>
    );
};

export default MainNav;
