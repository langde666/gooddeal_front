import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AuthAvatar from '../../vendor/auth/AuthAvatar';

const VendorSideBar = (props) => {
    const path = useLocation().pathname.split('/')[2];
    let { _id: userId } = useSelector(state => state.user.user);
    let { _id, isActive, ownerId } = useSelector(state => state.store.store);

    return (
        <div className="vendor-sidebar sticky-sidebar d-flex flex-column flex-shrink-0 p-3 shadow bg-body rounded">
            <ul className="nav nav-pills flex-column mb-auto">
                <div className="d-flex flex-column justify-content-center">
                    <AuthAvatar />

                    <div className="d-flex justify-content-center align-items-center">
                        {ownerId && userId == ownerId._id ? (
                            <div className="d-inline-block position-relative">
                                <span className="badge bg-info cus-tooltip">
                                    <i className="fas fa-user-shield me-2"></i>owner
                                </span>
                                <small className="cus-tooltip-msg">Shop's owner</small>
                            </div>
                        ) : (
                            <div className="d-inline-block position-relative">
                                <span className="badge bg-primary cus-tooltip">
                                    <i className="fas fa-user-friends me-2"></i>staff
                                </span>
                                <small className="cus-tooltip-msg">Shop's staff</small>
                            </div>
                        )}

                        {isActive ? (
                            <div className="d-inline-block position-relative">
                                <span className="badge bg-info ms-1 cus-tooltip">
                                    <i className="fas fa-check-circle me-2"></i>licensed</span>
                                <small className="cus-tooltip-msg">Licensed shop</small>
                            </div>
                        ) : (
                            <div className="d-inline-block position-relative">
                                <span className="badge bg-danger ms-1 cus-tooltip">
                                    <i className="fas fa-times-circle me-2"></i>unlicensed
                                </span>
                                <small className="cus-tooltip-msg">Unlicensed, keep perfecting your shop to get licensed by GoodDeal!</small>
                            </div>
                        )}
                    </div>
                </div>
                <hr />

                <li className="nav-item">
                    <Link
                        to={`/vendor/${_id}`}
                        className={`nav-link cus-sidebar-item ripple link-dark ${path == _id ? 'active' : ''}`}
                    >
                        <i className="fas fa-chart-pie me-3"></i>
                        Dashboard
                    </Link>
                </li>

                <li className="nav-item">
                    <Link
                        to={`/vendor/profile/${_id}`}
                        className={`nav-link cus-sidebar-item ripple link-dark ${path == 'profile' ? 'active' : ''}`}
                    >
                        <i className="fas fa-store me-3"></i>
                        Shop profile
                    </Link>
                </li>

                <li className="nav-item">
                    <Link
                        to={`/vendor/products/${_id}`}
                        className={`nav-link cus-sidebar-item ripple link-dark ${path == 'products' ? 'active' : ''}`}
                    >
                        <i className="fas fa-box me-3"></i>
                        Products manager
                    </Link>
                </li>

                <li className="nav-item">
                    <Link
                        to={`/vendor/staffs/${_id}`}
                        className={`nav-link cus-sidebar-item ripple link-dark ${path == 'staffs' ? 'active' : ''}`}
                    >
                        <i className="fas fa-user-friends me-3"></i>
                        Staffs manager
                    </Link>
                </li>

                <li className="nav-item">
                    <Link
                        to={`/vendor/orders/${_id}`}
                        className={`nav-link cus-sidebar-item ripple cus-sidebar-item--pink link-pink ${path == 'orders' ? 'active-pink' : ''}`}
                    >
                        <i className="fas fa-clipboard me-3"></i>
                        Orders manager
                    </Link>
                </li>

                <li className="nav-item">
                    <Link
                        to={`/vendor/gifts/${_id}`}
                        className={`nav-link cus-sidebar-item ripple cus-sidebar-item--funny link-funny ${path == 'gifts' ? 'active-funny' : ''}`}
                    >
                        <i className="fas fa-gift me-3"></i>
                        Gifts manager
                    </Link>
                </li>

                <li className="nav-item">
                    <Link
                        to={`/vendor/GDCoins/${_id}`}
                        className={`nav-link cus-sidebar-item cus-sidebar-item--golden ripple link-golden ${path == 'GDCoins' ? 'active-golden' : ''}`}
                    >
                        <i className="fas fa-coins me-3"></i>
                        GD coins
                    </Link>
                </li>
            </ul>
        </div>
    );
}

export default VendorSideBar;