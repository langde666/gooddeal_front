import { Link, useLocation } from 'react-router-dom';
import Avatar from '../../image/Avatar';
import ManagerRoleLabel from '../../label/ManagerRoleLabel';
import StoreLicenseLabel from '../../label/StoreLicenseLabel';

const VendorSideBar = ({ user = {}, store = {} }) => {
    const path = useLocation().pathname.split('/')[2];

    return (
        <div className="vendor-sidebar sticky-sidebar d-flex flex-column flex-shrink-0 p-3 shadow bg-body rounded">
            <ul className="nav nav-pills flex-column mb-auto">
                <div className="d-flex flex-column align-items-center position-relative">
                    <Avatar
                        avatar={store.avatar}
                        name={
                            <span className="d-inline-flex align-items-center">
                                {store.name}
                                <small className="ms-2">
                                    <ManagerRoleLabel
                                        role={
                                            store.ownerId &&
                                            user._id == store.ownerId._id
                                                ? 'owner'
                                                : 'staff'
                                        }
                                        detail={false}
                                    />
                                </small>
                                <small className="ms-1">
                                    <StoreLicenseLabel
                                        isActive={store.isActive}
                                        detail={false}
                                    />
                                </small>
                            </span>
                        }
                        alt={store.name}
                    />

                    <div className="manager-avatar-absolute">
                        <div className="cus-tooltip d-inline-block">
                            <Avatar
                                avatar={user.avatar}
                                alt={user.firstname + ' ' + user.lastname}
                                size="small"
                            />
                        </div>
                        <small className="cus-tooltip-msg">
                            Manager: {user.firstname + ' ' + user.lastname}
                        </small>
                    </div>
                </div>

                <hr />

                <li className="nav-item">
                    <Link
                        to={`/vendor/${store._id}`}
                        className={`nav-link cus-sidebar-item ripple link-dark ${
                            path == store._id ? 'active' : ''
                        }`}
                    >
                        <i className="fas fa-chart-pie me-3"></i>
                        Dashboard
                    </Link>
                </li>

                <li className="nav-item">
                    <Link
                        to={`/vendor/profile/${store._id}`}
                        className={`nav-link cus-sidebar-item ripple link-dark ${
                            path == 'profile' ? 'active' : ''
                        }`}
                    >
                        <i className="fas fa-store me-3"></i>
                        Shop profile
                    </Link>
                </li>

                <li className="nav-item">
                    <Link
                        to={`/vendor/products/${store._id}`}
                        className={`nav-link cus-sidebar-item ripple link-dark ${
                            path == 'products' ? 'active' : ''
                        }`}
                    >
                        <i className="fas fa-box me-3"></i>
                        Product
                    </Link>
                </li>

                <li className="nav-item">
                    <Link
                        to={`/vendor/staffs/${store._id}`}
                        className={`nav-link cus-sidebar-item ripple link-dark ${
                            path == 'staffs' ? 'active' : ''
                        }`}
                    >
                        <i className="fas fa-user-friends me-3"></i>
                        Staff
                    </Link>
                </li>

                <li className="nav-item">
                    <Link
                        to={`/vendor/orders/${store._id}`}
                        className={`nav-link cus-sidebar-item ripple cus-sidebar-item--pink link-pink ${
                            path == 'orders' ? 'active-pink' : ''
                        }`}
                    >
                        <i className="fas fa-clipboard me-3"></i>
                        Order
                    </Link>
                </li>

                {/* <li className="nav-item">
                    <Link
                        to={`/vendor/gifts/${store._id}`}
                        className={`nav-link cus-sidebar-item ripple cus-sidebar-item--funny link-funny ${path == 'gifts' ? 'active-funny' : ''
                            }`}
                    >
                        <i className="fas fa-gift me-3"></i>
                        Gift
                    </Link>
                </li> */}

                <li className="nav-item">
                    <Link
                        to={`/vendor/GDCoins/${store._id}`}
                        className={`nav-link cus-sidebar-item cus-sidebar-item--golden ripple link-golden ${
                            path == 'GDCoins' ? 'active-golden' : ''
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

export default VendorSideBar;
