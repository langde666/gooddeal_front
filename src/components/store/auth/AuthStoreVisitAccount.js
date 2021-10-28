import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addStoreVisit } from '../../../actions/storeVisit';
import { getToken } from '../../../apis/auth';
import { getStore } from '../../../apis/store';
import { checkFollowingStore } from '../../../apis/user';
import Loading from '../../ui/Loading';
import Error from '../../ui/Error';

const IMG = process.env.REACT_APP_STATIC_URL;

const AuthStoreVisitAccount = ({ store, actions }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const { _id, accessToken } = getToken();
    const { storeId } = useParams();

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
                    let newStore = data.store;
                    checkFollowingStore(_id, accessToken, newStore._id)
                        .then(data => {
                            if (data.success) {
                                newStore.isFollowing = true;
                                actions(newStore);
                                setIsLoading(false);
                            }
                            else {
                                newStore.isFollowing = false;
                                actions(newStore);
                                setIsLoading(false);
                            }
                        })
                        .catch(error => {
                            newStore.isFollowing = false;
                            actions(newStore);
                            setIsLoading(false);
                        });
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
    return { store: state.storeVisit.store }
}

function mapDispatchToProps(dispatch) {
    return { actions: (store) => dispatch(addStoreVisit(store)) }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthStoreVisitAccount);