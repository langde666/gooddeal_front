import { Link, useLocation } from 'react-router-dom';
import { getToken } from '../../../apis/auth';
import StoreSearchBar from './StoreSearchBar';
import StoreFollowButton from '../../store/item/StoreFollowButton';

const IMG = process.env.REACT_APP_STATIC_URL;

const StoreVisitNav = ({ avatar, name, storeId }) => {
    const path = useLocation().pathname.split('/')[2];

    return (
        <nav className="navbar sticky-topnav navbar-expand-lg navbar-light bg-body shadow rounded-bottom">
            <div className="container-fluid p-0">
                <Link className="navbar-brand your-shop-card btn btn-outline-light cus-outline ripple" to={`/store/${storeId}`}>
                    <img
                        src={avatar ? `${IMG + avatar}` : ''}
                        className="your-shop-img"
                    />
                    <span className="your-shop-name noselect">
                        {name}
                    </span>
                </Link>

                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${path == 'products' ? 'active' : ''}`}
                                to={`/store/products/${storeId}`}
                            >
                                Products
                            </Link>
                        </li>
                        {/* <li className="nav-item">
                            <Link
                                className={`nav-link ${path == 'gifts' ? 'active' : ''}`}
                                to={`/store/gifts/${storeId}`}
                            >
                                Gifts
                            </Link>
                        </li> */}
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
                        <StoreFollowButton storeId={storeId} />
                    </div>}

                </div>
            </div>
        </nav>
    );
}

export default StoreVisitNav;