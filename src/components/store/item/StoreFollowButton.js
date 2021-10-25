import { useState, useEffect } from 'react';
import { getToken } from '../../../apis/auth';
import { checkFollowingStore } from '../../../apis/user';
import { followStore, unfollowStore } from '../../../apis/user';
import useToggle from '../../../hooks/useToggle';
import Loading from '../../ui/Loading';
import Error from '../../ui/Error';

const StoreFollowButton = ({ storeId }) => {
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [followingFlag, toggleFollowingFlag] = useToggle(false);
    const { _id, accessToken } = getToken();

    const init = () => {
        checkFollowingStore(_id, accessToken, storeId)
            .then(data => {
                if (data.success) {
                    toggleFollowingFlag(true);
                }
            });
    }

    useEffect(() => {
        init();
    }, [storeId]);

    const handleFollowStore = () => {
        if (!followingFlag) {
            setError('');
            setIsLoading(true);
            followStore(_id, accessToken, storeId)
                .then(data => {
                    if (data.error) {
                        setError(data.error);
                        setIsLoading(false);
                        setTimeout(() => {
                            setError('');
                        }, 3000);
                    }
                    else {
                        toggleFollowingFlag(true);
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
            unfollowStore(_id, accessToken, storeId)
                .then(data => {
                    if (data.error) {
                        setError(data.error);
                        setIsLoading(false);
                        setTimeout(() => {
                            setError('');
                        }, 3000);
                    }
                    else {
                        toggleFollowingFlag(false);
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
            className={`btn ${followingFlag ? 'btn-pink' : 'btn-outline-pink'} ripple`}
            onClick={handleFollowStore}
        >
            {isLoading && <Loading />}
            {error && <Error msg={error} />}
            {followingFlag ? (
                <span>
                    <i className="fas fa-heart me-2"></i>Following
                </span>
            ) : (
                <span>
                    <i className="far fa-heart me-2"></i>Follow
                </span>
            )}

        </button>
    );
}
export default StoreFollowButton;