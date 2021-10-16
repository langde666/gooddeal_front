import { Link, useLocation } from 'react-router-dom';

const UserShopManagerNav = (props) => {
    const path = useLocation().pathname.split('/')[3];
    return (
        <ul className="nav nav-tabs bg-primary px-2 pt-2 rounded-top sticky-sidebar w-100">
            <li className="nav-item">
                <Link
                    className={`nav-link ${path == 'orders' ? 'active text-primary' : 'text-white'}`}
                    to="/user/shopManager/orders">
                    <i className="fas fa-clipboard me-2"></i>Fast Orders
                </Link>
            </li>
            <li className="nav-item">
                <Link
                    className={`nav-link ${path == 'shops' ? 'active text-primary' : 'text-white'}`}
                    to="/user/shopManager/shops"
                >
                    <i className="fas fa-store me-2"></i>Your Shops
                </Link>
            </li>
        </ul>
    );
}

export default UserShopManagerNav;