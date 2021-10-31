import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addStore } from "../../../actions/store";
import { getToken } from "../../../apis/auth";
import { followStore, unfollowStore, checkFollowingStore } from '../../../apis/follow';
import Loading from '../../ui/Loading';
import Error from '../../ui/Error';

const AuthFollow = (props) => {
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { _id, accessToken } = getToken();
    const store = useSelector(state => state.store.store);
    const dispatch = useDispatch();

    const init = () => {
        checkFollowingStore(_id, accessToken, store._id)
            .then(data => {
                if (data.success) {
                    store.isFollowing = true;
                    dispatch(addStore(store));
                }
                else {
                    store.isFollowing = false;
                    dispatch(addStore(store));
                }
            })
            .catch(error => {
                store.isFollowing = false;
                dispatch(addStore(store));
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
                        dispatch(addStore(data.store));
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
                        dispatch(addStore(data.store));
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
export default AuthFollow;