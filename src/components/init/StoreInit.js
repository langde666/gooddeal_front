import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addStore, } from '../../actions/store';
import { getToken } from '../../apis/auth';
import { getStore } from '../../apis/store';
import { getStoreLevel } from '../../apis/level';
import { checkFollowingStore } from '../../apis/follow';
import Loading from '../ui/Loading';
import Error from '../ui/Error';

const IMG = process.env.REACT_APP_STATIC_URL;

const StoreInit = ({ store, actions }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const { _id, accessToken } = getToken();
    const { storeId } = useParams();

    const init = () => {
        setIsLoading(true);
        setError('');
        getStore(storeId)
            .then(async data => {
                if (data.error) {
                    setError(data.error);
                    setIsLoading(false);
                }
                else {
                    const newStore = data.store;

                    try {
                        const data = await checkFollowingStore(_id, accessToken, storeId);
                        newStore.isFollowing = data.success ? true : false;
                    } catch { }

                    try {
                        const data = await getStoreLevel(storeId);
                        newStore.level = data.error ? {} : data.level;
                    } catch { }

                    actions(newStore);
                    setIsLoading(false);
                }
            })
            .catch(error => {
                setError('Server Error');
                setIsLoading(false);
            });
    }

    useEffect(() => {
        if (!store || store._id != storeId) init();
    }, [storeId]);

    return (
        isLoading ? (
            <div className="cus-position-relative-loading">
                <Loading size="small" />
            </div>
        ) : (
            <Link className="navbar-brand your-shop-card btn btn-outline-light cus-outline ripple m-0" to={`/store/${storeId}`}>
                <img
                    src={`${IMG + store.avatar}`}
                    className="your-shop-img"
                />
                <span className="your-shop-name noselect">
                    {store.name}
                    {error && <Error msg={error} />}
                </span>
            </Link>)
    );
};

function mapStateToProps(state) {
    return { store: state.store.store }
}

function mapDispatchToProps(dispatch) {
    return { actions: (store) => dispatch(addStore(store)) }
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreInit);