import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AuthAvatar from '../../ui/AuthAvatar';

const UserSideBar = (props) => {
    const role = useSelector((state) => state.user.user.role);
    const path = useLocation().pathname.split('/')[2];
    return (
        <div className="user-sidebar sticky-sidebar d-flex flex-column flex-shrink-0 p-3 shadow bg-body rounded">
            <ul className="nav nav-pills flex-column mb-auto">
                <AuthAvatar />
                <hr />

                <li className="nav-item">
                    <Link
                        to="/user/profile"
                        className={`nav-link cus-sidebar-item ripple link-dark ${path == 'profile' ? 'active' : ''}`}
                    >
                        <i className="fas fa-user-circle me-3"></i>
                        Your profile
                    </Link>
                </li>
                {role == 'user' && (
                    <li className="nav-item">
                        <Link
                            to="/user/addresses"
                            className={`nav-link cus-sidebar-item ripple link-dark ${path == 'addresses' ? 'active' : ''}`}
                        >
                            <i className="fas fa-address-card me-3"></i>
                            Your addresses
                        </Link>
                    </li>)}
                {role == 'user' && (
                    <li className="nav-item">
                        <Link
                            to="/user/purchase"
                            className={`nav-link cus-sidebar-item ripple link-dark ${path == 'purchase' ? 'active' : ''}`}
                        >
                            <i className="fas fa-shopping-bag me-3"></i>
                            Purchase history
                        </Link>
                    </li>)}

                <li className="nav-item">
                    <Link
                        to="/user/following"
                        className={`nav-link cus-sidebar-item cus-sidebar-item--pink ripple link-pink ${path == 'following' ? 'active-pink' : ''}`}
                    >
                        <i className="fas fa-heart me-3"></i>
                        Following
                    </Link>
                </li>

                {role == 'user' && (
                    <li className="nav-item">
                        <Link
                            to="/user/giftWallet"
                            className={`nav-link cus-sidebar-item cus-sidebar-item--funny ripple link-funny ${path == 'giftWallet' ? 'active-funny' : ''}`}
                        >
                            <i className="fas fa-gift me-3"></i>
                            Gift wallet
                        </Link>
                    </li>)}

                {role == 'user' && (
                    <li className="nav-item">
                        <Link
                            to="/user/GDCoins"
                            className={`nav-link cus-sidebar-item cus-sidebar-item--golden ripple link-golden ${path == 'GDCoins' ? 'active-golden' : ''}`}
                        >
                            <i className="fas fa-coins me-3"></i>
                            GD coins
                        </Link>
                    </li>)}

                {role == 'user' && (
                    <li className="nav-item">
                        <Link
                            to="/user/stores"
                            className={`nav-link cus-sidebar-item ripple link-dark ${path == 'stores' ? 'active' : ''}`}
                        >
                            <i className="fas fa-store me-3"></i>
                            Your stores
                        </Link>
                    </li>)}

                {role == 'admin' && (
                    <li className="nav-item">
                        <Link
                            to="/"
                            className='nav-link cus-sidebar-item'
                        >
                            <i className="fas fa-user-tie me-3"></i>
                            Admin dashboard
                        </Link>
                    </li>)}
            </ul>
        </div>

    )
}

export default UserSideBar;