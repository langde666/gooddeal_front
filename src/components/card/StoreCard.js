import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getToken } from '../../apis/auth';
import { checkFollowingStore } from '../../apis/follow';
import { getStoreLevel } from '../../apis/level';
import StoreCommissionLabel from '../label/StoreCommissionLabel';
import StoreLevelLabel from '../label/StoreLevelLabel';
import StoreFollowLabel from '../label/StoreFollowLabel';
import StoreStatusLabel from '../label/StoreStatusLabel';
import StarRating from '../label/StarRating';
import FollowStoreButton from '../button/FollowStoreButton';

const IMG = process.env.REACT_APP_STATIC_URL;

const StoreCard = ({ store, hasFollowBtn = false, onRun = () => { } }) => {
    const [storeValue, setStoreValue] = useState({});

    const init = async () => {
        let newStore = store;
        try {
            const { _id, accessToken } = getToken();
            const data = await checkFollowingStore(_id, accessToken, store._id);
            newStore.isFollowing = data.success ? true : false;
        } catch { }

        try {
            const data = await getStoreLevel(store._id)
            newStore.level = data.level;
        } catch { }

        setStoreValue(newStore);
    }

    useEffect(() => {
        init();
    }, [store]);

    return (
        <div className="card shadow border-0">
            <Link className="text-reset text-decoration-none" to={`/store/${storeValue._id}`}>
                <div className="card-img-top cus-card-img-top">
                    <img src={IMG + storeValue.avatar}
                        className="cus-card-img"
                        alt={storeValue.name} />
                </div>
            </Link>

            <div className="card-body border-top border-secondary">
                <small className="card-subtitle">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="level-wrap">
                            <span className="me-1">
                                <StoreCommissionLabel commission={storeValue.commissionId} detail={false} />
                            </span>

                            <span className="me-1">
                                <StoreLevelLabel level={storeValue.level} detail={false} />
                            </span>

                            <span className="">
                                <StoreFollowLabel number_of_followers={storeValue.number_of_followers} />
                            </span>
                        </div>

                        <span className="">
                            <StoreStatusLabel isOpen={storeValue.isOpen} detail={false} />
                        </span>
                    </div>

                    <StarRating stars={store.rating == 0 && store.number_of_reviews == 0 ? 3 : store.rating} />
                </small>

                <Link className="text-reset text-decoration-none link-hover" to={`/store/${store._id}`}>
                    <h6 className="card-title text-nowrap mt-1">
                        {store.name}
                    </h6>
                </Link>

                {hasFollowBtn && (
                    <FollowStoreButton
                        storeId={store._id}
                        isFollowing={store.isFollowing}
                        className='w-100 mt-1'
                        onRun={onRun} />
                )}
            </div>
        </div>
    );
}

export default StoreCard;