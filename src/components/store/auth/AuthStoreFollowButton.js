import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { addStoreVisit } from "../../../actions/storeVisit";
import { getToken } from "../../../apis/auth";
import { checkFollowingStore } from '../../../apis/user';
import { followStore, unfollowStore } from '../../../apis/user';
import Loading from '../../ui/Loading';
import Error from '../../ui/Error';

const StoreFollowButton = (props) => {
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { storeId } = useParams();
    const { _id, accessToken } = getToken();
    const store = useSelector(state => state.storeVisit.store);
    const dispatch = useDispatch();

    const init = () => {
        checkFollowingStore(_id, accessToken, store._id)
            .then(data => {
                if (data.success) {
                    store.isFollowing = true;
                    dispatch(addStoreVisit(store));
                }
                else {
                    store.isFollowing = false;
                    dispatch(addStoreVisit(store));
                }
            })
            .catch(error => {
                store.isFollowing = false;
                dispatch(addStoreVisit(store));
            });
    }

    useEffect(() => {
        if (typeof store.isFollowing !== 'boolean') init();
    }, [store]);

    const handleFollowStore = () => {
        if (!store.isFollowing) {
            setError('');
            setIsLoading(true);
            followStore(_id, accessToken, store._id)
                .then(data => {
                    if (data.error) {
                        setError(data.error);
                        setIsLoading(false);
                        setTimeout(() => {
                            setError('');
                        }, 3000);
                    }
                    else {
                        data.store.isFollowing = true;
                        dispatch(addStoreVisit(data.store));
                        setIsLoading(false);
                    }
                })
                .catch(error => {
                    setError('Server Error');
                    setIsLoading(false);
                    setTimeout(() => {
                        setError('');
                    }, 3000);
                });
        }
        else {
            setError('');
            setIsLoading(true);
            unfollowStore(_id, accessToken, store._id)
                .then(data => {
                    if (data.error) {
                        setError(data.error);
                        setIsLoading(false);
                        setTimeout(() => {
                            setError('');
                        }, 3000);
                    }
                    else {
                        data.store.isFollowing = false;
                        dispatch(addStoreVisit(data.store));
                        setIsLoading(false);
                    }
                })
                .catch(error => {
                    setError('Server Error');
                    setIsLoading(false);
                    setTimeout(() => {
                        setError('');
                    }, 3000);
                });
        }
    }

    return (
        <button
            type="button"
            className={`btn ${store.isFollowing ? 'btn-pink' : 'btn-outline-pink'} ripple`}
            onClick={handleFollowStore}
        >
            {isLoading && <Loading size="small" />}
            {error ? (
                <Error msg={error} />
            ) : (
                store.isFollowing ? (
                    <span>
                        <i className="fas fa-heart me-2"></i>Following
                    </span>
                ) : (
                    <span>
                        <i className="far fa-heart me-2"></i>Follow
                    </span>))}
        </button>
    );
}
export default StoreFollowButton;