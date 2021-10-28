import { Link, useLocation } from 'react-router-dom';
import { getToken } from '../../../apis/auth';
import StoreSearchBar from './StoreSearchBar';
import AuthStoreVisitAccount from '../../store/auth/AuthStoreVisitAccount';
import AuthStoreFollowButton from '../../store/auth/AuthStoreFollowButton';

const IMG = process.env.REACT_APP_STATIC_URL;

const StoreVisitNav = ({ storeId = '' }) => {
    const path = useLocation().pathname.split('/')[2];
    return (
        <nav className="navbar sticky-topnav navbar-expand-lg navbar-light bg-body shadow rounded-bottom">
            <div className="container-fluid p-0">
                <AuthStoreVisitAccount />
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${path == 'products' ? 'active' : ''}`}
                                to={`/store/products/${storeId}`}
                            >
                                Collection
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${path == 'gift' ? 'active' : ''}`}
                                to={`/store/gift/${storeId}`}
                            >
                                Gift
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${path == 'review&rating' ? 'active' : ''}`}
                                to={`/store/review&rating/${storeId}`}
                            >
                                Review & Rating
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${path == 'about' ? 'active' : ''}`}
                                to={`/store/about/${storeId}`}
                            >
                                About
                            </Link>
                        </li>
                    </ul>

                    <div className="d-inline-block ms-2">
                        <StoreSearchBar storeId={storeId} />
                    </div>

                    {getToken() && <div className="d-inline-block ms-2">
                        <AuthStoreFollowButton />
                    </div>}

                </div>
            </div>
        </nav>
    );
}

export default StoreVisitNav;