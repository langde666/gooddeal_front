import { Link, useLocation } from 'react-router-dom';
import AuthAvatar from '../../ui/AuthAvatar';

const UserSideBar = (props) => {
    const path = useLocation().pathname.split('/')[2];
    return (
        <div className="user-sidebar d-flex flex-column flex-shrink-0 p-3 shadow mb-5 bg-body rounded" style={{ width: '260px' }}>
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
                <li className="nav-item">
                    <Link
                        to="/user/account"
                        className={`nav-link cus-sidebar-item ripple link-dark ${path == 'account' ? 'active' : ''}`}
                    >
                        <i className="fas fa-address-card me-3"></i>
                        Your account
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        to="/user/purchase"
                        className={`nav-link cus-sidebar-item ripple link-dark ${path == 'purchase' ? 'active' : ''}`}
                    >
                        <i className="fas fa-shopping-bag me-3"></i>
                        Purchase history
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        to="/user/following"
                        className={`nav-link cus-sidebar-item cus-sidebar-item--pink ripple link-pink ${path == 'following' ? 'active-pink' : ''}`}
                    >
                        <i className="fas fa-heart me-3"></i>
                        Following
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        to="/user/giftWallet"
                        className={`nav-link cus-sidebar-item cus-sidebar-item--funny ripple link-funny ${path == 'giftWallet' ? 'active-funny' : ''}`}
                    >
                        <i className="fas fa-gift me-3"></i>
                        Gift wallet
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        to="/user/GDCoins"
                        className={`nav-link cus-sidebar-item cus-sidebar-item--golden ripple link-golden ${path == 'GDCoins' ? 'active-golden' : ''}`}
                    >
                        <i className="fas fa-coins me-3"></i>
                        GD Coins
                    </Link>
                </li>
            </ul>
        </div>

    )
}

export default UserSideBar;