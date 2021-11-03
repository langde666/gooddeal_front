import { Link, useLocation } from 'react-router-dom';
import UserInit from '../../init/UserInit';

const IMG = process.env.REACT_APP_STATIC_URL;

const UserNav = ({ user = {} }) => {
    const path = useLocation().pathname.split('/')[2];

    return (
        <nav className="user-nav navbar sticky-topnav navbar-expand-lg navbar-light bg-body shadow rounded-bottom">
            <div className="container-fluid p-0">
                <Link
                    className="navbar-brand p-0 m-0 "
                    to={`/user/${user._id}`}
                >
                    <UserInit />
                </Link>

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
            </div>
        </nav>
    );
};

export default UserNav;
