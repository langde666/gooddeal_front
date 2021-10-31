import { Link, useLocation } from 'react-router-dom';

const IMG = process.env.REACT_APP_STATIC_URL;

const UserNav = ({ avatar = '', name = '', userId = '' }) => {
    const path = useLocation().pathname.split('/')[2];

    return (
        <nav className="user-nav navbar sticky-topnav navbar-expand-lg navbar-light bg-body shadow rounded-bottom">
            <div className="container-fluid p-0">
                <Link className="navbar-brand your-account-card btn btn-outline-light cus-outline ripple" to={`/user/${userId}`}>
                    <img
                        src={avatar ? `${IMG + avatar}` : ''}
                        className="your-account-img"
                    />
                    <span className="your-account-name noselect">
                        {name}
                    </span>
                </Link>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${path == 'about' ? 'active' : ''}`}
                                to={`/user/about/${userId}`}
                            >
                                About
                            </Link>
                        </li>
                    </ul>

                    <div className="position-relative d-inline-block">
                        <div className="temp cus-tooltip">
                            <form className="user-visit-search-bar m-0 input-group">
                                <input disabled className="form-control" type="search" placeholder="Search" aria-label="Search" />
                                <button
                                    disabled
                                    className="btn btn-outline-light border border-primary cus-outline text-white ripple"
                                    type="submit"
                                >
                                    <i className="fas fa-search"></i>
                                </button>
                            </form>

                        </div>
                        <small className="cus-tooltip-msg">This function is not available yet</small>
                    </div>

                    <div className="position-relative d-inline-block ms-2">
                        <div className="temp cus-tooltip">
                            <button
                                disabled
                                className="btn btn-outline-pink ripple"
                            >
                                <i className="far fa-heart me-2"></i>Follow
                                {/* <i className="fas fa-heart me-2"></i>Following */}
                            </button>
                        </div>
                        <small className="cus-tooltip-msg">This function is not available yet</small>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default UserNav;