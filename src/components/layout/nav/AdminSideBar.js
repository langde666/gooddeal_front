import { Link, useLocation } from 'react-router-dom';
import AuthAvatar from '../../user/auth/AuthAvatar';

const AdminSideBar = (props) => {
    const path = useLocation().pathname.split('/')[2];
    return (
        <div className="user-sidebar sticky-sidebar d-flex flex-column flex-shrink-0 p-3 shadow bg-body rounded">
            <ul className="nav nav-pills flex-column mb-auto">
                <div className="d-flex justify-content-center">
                    <AuthAvatar />
                </div>
                <hr />

                <li className="nav-item">
                    <Link
                        to={`/admin/dashboard`}
                        className={`nav-link cus-sidebar-item ripple link-dark ${path == 'dashboard' ? 'active' : ''}`}
                    >
                        <i className="fas fa-chart-pie me-3"></i>
                        Dashboard
                    </Link>
                </li>

                <li className="nav-item">
                    <Link
                        to={`/admin/level`}
                        className={`nav-link cus-sidebar-item ripple link-dark ${path == 'level' ? 'active' : ''}`}
                    >
                        <i className="fas fa-shield-alt me-3"></i>
                        Level manager
                    </Link>
                </li>

                <li className="nav-item">
                    <Link
                        to={`/admin/commission`}
                        className={`nav-link cus-sidebar-item ripple link-dark ${path == 'commission' ? 'active' : ''}`}
                    >
                        <i className="fas fa-calculator me-3"></i>
                        Commission manager
                    </Link>
                </li>

                <li className="nav-item">
                    <Link
                        to={`/admin/delivery`}
                        className={`nav-link cus-sidebar-item ripple link-dark ${path == 'delivery' ? 'active' : ''}`}
                    >
                        <i className="fas fa-truck me-3"></i>
                        Delivery manager
                    </Link>
                </li>

                <li className="nav-item">
                    <Link
                        to={`/admin/users`}
                        className={`nav-link cus-sidebar-item ripple link-dark ${path == 'users' ? 'active' : ''}`}
                    >
                        <i className="fas fa-user-friends me-3"></i>
                        Users manager
                    </Link>
                </li>

                <li className="nav-item">
                    <Link
                        to={`/admin/stores`}
                        className={`nav-link cus-sidebar-item ripple link-dark ${path == 'stores' ? 'active' : ''}`}
                    >
                        <i className="fas fa-store me-3"></i>
                        Stores manager
                    </Link>
                </li>

                <li className="nav-item">
                    <Link
                        to='/admin/orders'
                        className={`nav-link cus-sidebar-item ripple cus-sidebar-item--pink link-pink ${path == 'orders' ? 'active-pink' : ''}`}
                    >
                        <i className="fas fa-clipboard me-3"></i>
                        Orders manager
                    </Link>
                </li>

                <li className="nav-item">
                    <Link
                        to='/admin/gifts'
                        className={`nav-link cus-sidebar-item ripple cus-sidebar-item--funny link-funny ${path == 'gifts' ? 'active-funny' : ''}`}
                    >
                        <i className="fas fa-gift me-3"></i>
                        Gifts manager
                    </Link>
                </li>

                <li className="nav-item">
                    <Link
                        to='/admin/GDCoins'
                        className={`nav-link cus-sidebar-item cus-sidebar-item--golden ripple link-golden ${path == 'GDCoins' ? 'active-golden' : ''}`}
                    >
                        <i className="fas fa-coins me-3"></i>
                        GD coins
                    </Link>
                </li>

                <li className="nav-item">
                    <Link
                        to={`/admin/products`}
                        className={`nav-link cus-sidebar-item ripple link-dark ${path == 'products' ? 'active' : ''}`}
                    >
                        <i className="fas fa-box me-3"></i>
                        Products manager
                    </Link>
                </li>

                <li className="nav-item">
                    <Link
                        to={`/admin/category`}
                        className={`nav-link cus-sidebar-item ripple link-dark ${path == 'category' ? 'active' : ''}`}
                    >
                        <i className="fas fa-boxes me-3"></i>
                        Category manager
                    </Link>
                </li>

                <li className="nav-item">
                    <Link
                        to={`/admin/brand`}
                        className={`nav-link cus-sidebar-item ripple link-dark ${path == 'brand' ? 'active' : ''}`}
                    >
                        <i className="fas fa-copyright me-3"></i>
                        Brand manager
                    </Link>
                </li>

                <li className="nav-item">
                    <Link
                        to={`/admin/style`}
                        className={`nav-link cus-sidebar-item ripple link-dark ${path == 'style' ? 'active' : ''}`}
                    >
                        <i className="fab fa-black-tie me-3"></i>
                        Style manager
                    </Link>
                </li>
            </ul>
        </div>

    )
}

export default AdminSideBar;