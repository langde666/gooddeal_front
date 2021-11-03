import { Link, useLocation } from 'react-router-dom';
import useUpdateDispatch from '../../../hooks/useUpdateDispatch';
import Avatar from '../../image/Avatar';
import ManagerRoleLabel from '../../label/ManagerRoleLabel';
import StoreLicenseLabel from '../../label/StoreLicenseLabel';
import OpenCloseStoreButton from '../../button/OpenCloseStoreButton';

const VendorSideBar = ({ user = {}, store = {} }) => {
    const path = useLocation().pathname.split('/')[2];
    const [updateDispatch] = useUpdateDispatch();

    const onHandleRun = (newStore) => {
        updateDispatch('vendor', newStore);
    };

    return (
        <div className="vendor-sidebar sticky-sidebar d-flex flex-column flex-shrink-0 p-3 shadow bg-body rounded">
            <ul className="nav nav-pills flex-column mb-auto">
                <div className="d-flex flex-column align-items-center">
                    <div className="position-relative">
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
                            <div className="cus-tooltip">
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

                    <div
                        className="mx-auto position-relative"
                        style={{ width: '142px', maxWidth: '100%' }}
                    >
                        <OpenCloseStoreButton
                            storeId={store._id}
                            isOpen={store.isOpen}
                            className="w-100 btn-sm cus-tooltip"
                            onRun={(store) => onHandleRun(store)}
                        />
                        <small className="cus-tooltip-msg">
                            {store.isOpen
                                ? 'Click to close shop'
                                : 'Click to open shop'}
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
                        to={`/vendor/collections/${store._id}`}
                        className={`nav-link cus-sidebar-item ripple link-dark ${
                            path == 'collections' ? 'active' : ''
                        }`}
                    >
                        <i className="fas fa-boxes me-3"></i>
                        Collections manager
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
                        Products manager
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
                        Staffs manager
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
                        Orders manager
                    </Link>
                </li>

                <li className="nav-item">
                    <Link
                        to={`/vendor/gifts/${store._id}`}
                        className={`nav-link cus-sidebar-item ripple cus-sidebar-item--funny link-funny ${
                            path == 'gifts' ? 'active-funny' : ''
                        }`}
                    >
                        <i className="fas fa-gift me-3"></i>
                        Gifts manager
                    </Link>
                </li>

                <li className="nav-item">
                    <Link
                        to={`/vendor/GDCoins/${store._id}`}
                        className={`nav-link cus-sidebar-item cus-sidebar-item--golden ripple link-golden ${
                            path == 'GDCoins' ? 'active-golden' : ''
                        }`}
                    >
                        <i className="fas fa-coins me-3"></i>
                        GD coins
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default VendorSideBar;
