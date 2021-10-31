import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import { addStore, updateIsFollowing, updateLevel } from '../../actions/store';
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
    const dispatch = useDispatch();

    const init = () => {
        setIsLoading(true);
        setError('');
        getStore(storeId)
            .then(data => {
                if (data.error) {
                    setError(data.error);
                    setIsLoading(false);
                }
                else {
                    actions(data.store);
                    setIsLoading(false);

                    checkFollowingStore(_id, accessToken, storeId)
                        .then(data => {
                            if (data.success) dispatch(updateIsFollowing(true));
                            else dispatch(updateIsFollowing(false));
                        })
                        .catch(error => dispatch(updateIsFollowing(false)));

                    getStoreLevel(storeId)
                        .then(data => {
                            if (data.error) return;
                            else dispatch(updateLevel(data.level));
                        })
                        .catch((error) => { return; });
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