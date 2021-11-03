import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { addStore } from '../../actions/store';
import { getToken } from '../../apis/auth';
import { getStore } from '../../apis/store';
import { getStoreLevel } from '../../apis/level';
import { getNumberOfFollowers, checkFollowingStore } from '../../apis/follow';
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
            .then(async (data) => {
                if (data.error) {
                    setError(data.error);
                    setIsLoading(false);
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
                        const data = await checkFollowingStore(
                            _id,
                            accessToken,
                            storeId,
                        );
                        newStore.isFollowing = data.success ? true : false;
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
                setError('Server Error');
                setIsLoading(false);
            });
    };

    useEffect(() => {
        if (!store || store._id != storeId) init();
    }, [storeId]);

    return isLoading ? (
        <div className="cus-position-relative-loading">
            <Loading size="small" />
        </div>
    ) : (
        <div
            type="button"
            className="your-shop-card btn btn-outline-light cus-outline ripple"
        >
            <img src={`${IMG + store.avatar}`} className="your-shop-img" />
            <span className="your-shop-name tetx noselect">
                {store.name}
                {error && <Error msg={error} />}
            </span>
        </div>
    );
};

function mapStateToProps(state) {
    return { store: state.store.store };
}

function mapDispatchToProps(dispatch) {
    return { actions: (store) => dispatch(addStore(store)) };
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreInit);
