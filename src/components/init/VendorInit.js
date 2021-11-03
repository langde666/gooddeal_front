import { useState, useEffect, Fragment } from 'react';
import { Link, useParams, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { addVendor } from '../../actions/vendor';
import { getToken } from '../../apis/auth';
import { getStoreProfile } from '../../apis/store';
import { getStoreLevel } from '../../apis/level';
import { getNumberOfFollowers } from '../../apis/follow';
import Loading from '../ui/Loading';
import Error from '../ui/Error';

const IMG = process.env.REACT_APP_STATIC_URL;

const VendorInit = ({ store, actions }) => {
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [redirect, setRedirect] = useState(false);

    const { _id, accessToken } = getToken();
    const { storeId } = useParams();

    const init = () => {
        setIsLoading(true);
        setError('');

        getStoreProfile(_id, accessToken, storeId)
            .then(async (data) => {
                if (data.error) {
                    if (data.isManager === false) {
                        setRedirect(true);
                    } else {
                        setError(data.error);
                        setIsLoading(false);
                    }
                } else {
                    const newStore = data.store;

                    try {
                        const data = await getStoreLevel(storeId);
                        newStore.level = data.error ? {} : data.level;
                    } catch {}

                    try {
                        const data = await getNumberOfFollowers(storeId);
                        newStore.numberOfFollowers = data.count;
                    } catch {}

                    try {
                        //call api get numberOfSucessfulOrders, numberOfFailedOrders
                        newStore.numberOfSucessfulOrders = 0;
                        newStore.numberOfFailedOrders = 0;
                    } catch {}

                    try {
                        //call api get numberOfReviews
                        newStore.numberOfReviews = 0;
                    } catch {}

                    actions(newStore);
                    setIsLoading(false);
                }
            })
            .catch((error) => {
                setError('Server error');
                setIsLoading(false);
            });
    };

    useEffect(() => {
        if (!store || store._id != storeId) init();
    }, [storeId]);

    return (
        <Fragment>
            {redirect && (
                <Redirect
                    to={{
                        pathname: '/',
                    }}
                />
            )}

            {isloading ? (
                <div className="cus-position-relative-loading">
                    <Loading size="small" />
                </div>
            ) : (
                <div className="your-shop-wrap">
                    <div className="your-shop">
                        <Link
                            className="your-shop-card btn btn-outline-light cus-outline ripple"
                            to={`/vendor/${storeId}`}
                        >
                            <img
                                src={`${IMG + store.avatar}`}
                                className="your-shop-img"
                            />

                            <span className="your-shop-name noselect">
                                {!error && store.name}
                                {error && <Error msg={error} />}
                            </span>
                        </Link>

                        <ul className="list-group your-shop-options">
                            <Link
                                className="list-group-item your-shop-options-item ripple"
                                to={`/vendor/profile/${storeId}`}
                            >
                                <i className="fas fa-store me-1"></i>
                                Shop profile
                            </Link>

                            <Link
                                className="list-group-item your-shop-options-item ripple"
                                to={`/vendor/orders/${storeId}`}
                            >
                                <i className="fas fa-clipboard me-1"></i>
                                Orders
                            </Link>

                            <Link
                                className="list-group-item your-shop-options-item ripple"
                                to="/account/shopManager"
                            >
                                <i className="fas fa-arrow-circle-left me-1"></i>
                                Back
                            </Link>
                        </ul>
                    </div>
                </div>
            )}
        </Fragment>
    );
};

function mapStateToProps(state) {
    return { store: state.vendor.store };
}

function mapDispatchToProps(dispatch) {
    return { actions: (store) => dispatch(addVendor(store)) };
}

export default connect(mapStateToProps, mapDispatchToProps)(VendorInit);
