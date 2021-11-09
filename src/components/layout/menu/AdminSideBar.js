import { Link, useLocation } from 'react-router-dom';
import Avatar from '../../image/Avatar';

const AdminSideBar = ({ user = {} }) => {
    const path = useLocation().pathname.split('/')[2];
    return (
        <div className="user-sidebar sticky-sidebar d-flex flex-column flex-shrink-0 p-3 shadow bg-body rounded">
            <ul className="nav nav-pills flex-column mb-auto">
                <div className="d-flex justify-content-center">
                    <Avatar
                        avatar={user.avatar}
                        name={user.firstname + ' ' + user.lastname}
                        alt={user.firstname + ' ' + user.lastname}
                    />
                </div>
                <hr />

                <li className="nav-item">
                    <Link
                        to={`/admin/dashboard`}
                        className={`nav-link cus-sidebar-item ripple link-dark ${
                            path == 'dashboard' ? 'active' : ''
                        }`}
                    >
                        <i className="fas fa-chart-pie me-3"></i>
                        Dashboard
                    </Link>
                </li>

                <li className="nav-item">
                    <Link
                        to={`/admin/user`}
                        className={`nav-link cus-sidebar-item ripple link-dark ${
                            path == 'user' ? 'active' : ''
                        }`}
                    >
                        <i className="fas fa-user-friends me-3"></i>
                        User
                    </Link>
                </li>

                <li className="nav-item">
                    <Link
                        to={`/admin/store`}
                        className={`nav-link cus-sidebar-item ripple link-dark ${
                            path == 'store' ? 'active' : ''
                        }`}
                    >
                        <i className="fas fa-store me-3"></i>
                        Store
                    </Link>
                </li>

                <li className="nav-item">
                    <Link
                        to={`/admin/category`}
                        className={`nav-link cus-sidebar-item ripple link-dark ${
                            path == 'category' ? 'active' : ''
                        }`}
                    >
                        <i className="fas fa-th-large me-3"></i>
                        Category
                    </Link>
                </li>

                {/* <li className="nav-item">
                    <Link
                        to={`/admin/brand`}
                        className={`nav-link cus-sidebar-item ripple link-dark ${path == 'brand' ? 'active' : ''
                            }`}
                    >
                        <i className="fas fa-copyright me-3"></i>
                        Brand
                    </Link>
                </li> */}

                <li className="nav-item">
                    <Link
                        to={`/admin/style`}
                        className={`nav-link cus-sidebar-item ripple link-dark ${
                            path == 'style' ? 'active' : ''
                        }`}
                    >
                        <i className="fab fa-black-tie me-3"></i>
                        Style
                    </Link>
                </li>

                <li className="nav-item">
                    <Link
                        to={`/admin/product`}
                        className={`nav-link cus-sidebar-item ripple link-dark ${
                            path == 'product' ? 'active' : ''
                        }`}
                    >
                        <i className="fas fa-box me-3"></i>
                        Product
                    </Link>
                </li>

                <li className="nav-item">
                    <Link
                        to={`/admin/level`}
                        className={`nav-link cus-sidebar-item ripple link-dark ${
                            path == 'level' ? 'active' : ''
                        }`}
                    >
                        <i className="fas fa-shield-alt me-3"></i>
                        Level
                    </Link>
                </li>

                <li className="nav-item">
                    <Link
                        to={`/admin/commission`}
                        className={`nav-link cus-sidebar-item ripple link-dark ${
                            path == 'commission' ? 'active' : ''
                        }`}
                    >
                        <i className="fas fa-calculator me-3"></i>
                        Commission
                    </Link>
                </li>

                <li className="nav-item">
                    <Link
                        to={`/admin/delivery`}
                        className={`nav-link cus-sidebar-item ripple link-dark ${
                            path == 'delivery' ? 'active' : ''
                        }`}
                    >
                        <i className="fas fa-truck me-3"></i>
                        Delivery
                    </Link>
                </li>

                <li className="nav-item">
                    <Link
                        to="/admin/order"
                        className={`nav-link cus-sidebar-item ripple cus-sidebar-item--pink link-pink ${
                            path == 'order' ? 'active-pink' : ''
                        }`}
                    >
                        <i className="fas fa-clipboard me-3"></i>
                        Order
                    </Link>
                </li>

                {/* <li className="nav-item">
                    <Link
                        to="/admin/gifts"
                        className={`nav-link cus-sidebar-item ripple cus-sidebar-item--funny link-funny ${
                            path == 'gifts' ? 'active-funny' : ''
                        }`}
                    >
                        <i className="fas fa-gift me-3"></i>
                        Gifts
                    </Link>
                </li> */}

                <li className="nav-item">
                    <Link
                        to="/admin/GDCoin"
                        className={`nav-link cus-sidebar-item cus-sidebar-item--golden ripple link-golden ${
                            path == 'GDCoin' ? 'active-golden' : ''
                        }`}
                    >
                        <i className="fas fa-coins me-3"></i>
                        GD coin
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default AdminSideBar;
