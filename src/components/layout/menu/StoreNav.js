import { Link, useLocation } from 'react-router-dom';
import { getToken } from '../../../apis/auth';
import useUpdateDispatch from '../../../hooks/useUpdateDispatch';
import StoreSearchBar from './StoreSearchBar';
import StoreInit from '../../init/StoreInit';
import FollowStoreButton from '../../button/FollowStoreButton';

const IMG = process.env.REACT_APP_STATIC_URL;

const StoreNav = ({ store = {} }) => {
    const path = useLocation().pathname.split('/')[2];
    const [updateDispatch] = useUpdateDispatch();

    const onHandleRun = (newStore) => {
        updateDispatch('store', newStore);
    };

    return (
        <nav
            className="store-nav navbar sticky-topnav navbar-expand-lg navbar-light px-2 bg-body shadow rounded-bottom"
            style={{ maxWidth: '990px', margin: '0 auto' }}
        >
            <div className="container-fluid p-0">
                <Link
                    className="navbar-brand m-0 p-0"
                    to={`/store/${store._id}`}
                >
                    <StoreInit />
                </Link>

                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${
                                    path == 'collection' ? 'active' : ''
                                }`}
                                to={`/store/collection/${store._id}`}
                            >
                                Collection
                            </Link>
                        </li>
                        {/* <li className="nav-item">
                            <Link
                                className={`nav-link ${
                                    path == 'gift' ? 'active' : ''
                                }`}
                                to={`/store/gift/${store._id}`}
                            >
                                Gift
                            </Link>
                        </li> */}
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${
                                    path == 'review&rating' ? 'active' : ''
                                }`}
                                to={`/store/review&rating/${store._id}`}
                            >
                                Review & Rating
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className={`nav-link ${
                                    path == 'about' ? 'active' : ''
                                }`}
                                to={`/store/about/${store._id}`}
                            >
                                About
                            </Link>
                        </li>
                    </ul>

                    <div className="d-inline-block">
                        <StoreSearchBar storeId={store._id} />
                    </div>

                    {getToken() && (
                        <div className="d-inline-block ms-2">
                            <FollowStoreButton
                                storeId={store._id}
                                isFollowing={store.isFollowing}
                                onRun={(store) => onHandleRun(store)}
                            />
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default StoreNav;
