import { Link, useLocation } from 'react-router-dom';
import UserInit from '../../init/UserInit';
import UserSmallCard from '../../card/UserSmallCard';

const UserNav = ({ user = {} }) => {
    const path = useLocation().pathname.split('/')[2];

    return (
        <nav
            className="sticky-topnav navbar navbar-expand-md navbar-light bg-body shadow rounded-bottom"
            style={{ maxWidth: '990px', margin: '0 auto' }}
        >
            <div className="container-fluid res-d-flex-end-lg">
                <Link
                    className="navbar-brand res-hide-md"
                    to={`/user/${user._id}`}
                >
                    <UserInit />
                </Link>

                <button
                    className="btn btn-outline-light cus-outline ripple d-none res-dis-md"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#offcanvasNavbarUserNav"
                    aria-controls="offcanvasNavbarUserNav"
                >
                    <i className="fas fa-bars"></i>
                </button>

                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${
                                    path == 'about' ? 'active' : ''
                                }`}
                                to={`/user/about/${user._id}`}
                            >
                                About
                            </Link>
                        </li>
                    </ul>
                </div>

                <div
                    className="offcanvas offcanvas-end d-none res-dis-md"
                    tabIndex="-1"
                    id="offcanvasNavbarUserNav"
                    aria-labelledby="offcanvasNavbarUserNavLabel"
                    style={{
                        flexGrow: 'unset',
                        width: 'unset',
                        marginTop: 'var(--header-height)',
                    }}
                >
                    <div className="offcanvas-header border-bottom">
                        <h5
                            className="offcanvas-title me-5"
                            id="offcanvasNavbarUserNavLabel"
                        >
                            <UserSmallCard
                                user={user}
                                link={`/user/${user._id}`}
                            />
                        </h5>
                        <button
                            type="button"
                            className="btn-close text-reset"
                            data-bs-dismiss="offcanvas"
                            aria-label="Close"
                        ></button>
                    </div>

                    <div className="offcanvas-body">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item p-2 pt-0">
                                <Link
                                    className={`nav-link ${
                                        path == 'about' ? 'active' : ''
                                    }`}
                                    to={`/user/about/${user._id}`}
                                >
                                    <i className="fas fa-info-circle me-2"></i>
                                    About
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default UserNav;
