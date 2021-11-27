import { useSelector, useDispatch } from 'react-redux';
import { addAccount } from '../actions/account';
import { addVendor } from '../actions/vendor';
import { addUser } from '../actions/user';
import { addStore } from '../actions/store';
import { addProduct } from '../actions/product';
import { getNumberOfFollowers, checkFollowingStore } from '../apis/follow';
import { getUserLevel, getStoreLevel } from '../apis/level';
import { countOrder } from '../apis/order';
import { getCartCount } from '../apis/cart';
import { getToken } from '../apis/auth';

const useUpdateDispatch = () => {
    const account = useSelector((state) => state.account.user);
    const vendor = useSelector((state) => state.vendor.store);
    const user = useSelector((state) => state.user.user);
    const store = useSelector((state) => state.store.store);
    const product = useSelector((state) => state.product.product);
    const { _id, accessToken } = getToken();

    const dispatch = useDispatch();

    const updateDispatch = async (name, data) => {
        switch (name) {
            case 'account': {
                //get level
                try {
                    const res = await getUserLevel(_id);
                    data.level = res.level;
                } catch {
                    data.level = account.level;
                }

                //get count carts
                try {
                    const res = await getCartCount(_id, accessToken);
                    data.cartCount = res.count;
                } catch {
                    data.cartCount = account.cartCount;
                }

                //get count orders
                try {
                    const res1 = await countOrder('Delivered', _id, '');
                    const res2 = await countOrder('Cancelled', _id, '');
                    data.numberOfSucessfulOrders = res1.count;
                    data.numberOfFailedOrders = res2.count;
                } catch {
                    data.numberOfSucessfulOrders =
                        account.numberOfSucessfulOrders;
                    data.numberOfFailedOrders = account.numberOfFailedOrders;
                }

                return dispatch(addAccount(data));
            }

            case 'vendor': {
                //get level
                try {
                    const res = await getStoreLevel(data._id);
                    data.level = res.level;
                } catch {
                    data.level = vendor.level;
                }

                //get count followers
                try {
                    const res = await getNumberOfFollowers(data._id);
                    data.numberOfFollowers = res.count;
                } catch {
                    data.numberOfFollowers = vendor.numberOfFollowers;
                }

                //get count orders
                try {
                    const res1 = await countOrder('Delivered', '', data._id);
                    const res2 = await countOrder('Cancelled', '', data._id);
                    data.numberOfSucessfulOrders = res1.count;
                    data.numberOfFailedOrders = res2.count;
                } catch {
                    data.numberOfSucessfulOrders =
                        vendor.numberOfSucessfulOrders;
                    data.numberOfFailedOrders = vendor.numberOfFailedOrders;
                }

                return dispatch(addVendor(data));
            }

            case 'user': {
                //get level
                try {
                    const res = await getUserLevel(data._id);
                    data.level = res.level;
                } catch {
                    data.level = user.level;
                }

                //get count orders
                try {
                    const res1 = await countOrder('Delivered', data._id, '');
                    const res2 = await countOrder('Cancelled', data._id, '');
                    data.numberOfSucessfulOrders = res1.count;
                    data.numberOfFailedOrders = res2.count;
                } catch {
                    data.numberOfSucessfulOrders = user.numberOfSucessfulOrders;
                    data.numberOfFailedOrders = user.numberOfFailedOrders;
                }

                return dispatch(addUser(data));
            }

            case 'store': {
                //get level
                try {
                    const res = await getStoreLevel(data._id);
                    data.level = res.level;
                } catch {
                    data.level = store.level;
                }

                //get count followers
                try {
                    const res = await getNumberOfFollowers(data._id);
                    data.numberOfFollowers = res.count;
                } catch {
                    if (typeof data.isFollowing === 'boolean') {
                        const currentNumberOfFollowers =
                            store.numberOfFollowers;
                        data.numberOfFollowers = data.isFollowing
                            ? currentNumberOfFollowers + 1
                            : currentNumberOfFollowers - 1;
                    } else {
                        data.isFollowing = store.isFollowing;
                        data.numberOfFollowers = store.numberOfFollowers;
                    }
                }

                //check follow
                try {
                    const res = await checkFollowingStore(
                        _id,
                        accessToken,
                        data._id,
                    );
                    data.isFollowing = res.success ? true : false;
                } catch {
                    if (typeof data.isFollowing === 'boolean') {
                    } else data.isFollowing = store.isFollowing;
                }

                //get count orders
                try {
                    const res1 = await countOrder('Delivered', '', data._id);
                    const res2 = await countOrder('Cancelled', '', data._id);
                    data.numberOfSucessfulOrders = res1.count;
                    data.numberOfFailedOrders = res2.count;
                } catch {
                    data.numberOfSucessfulOrders =
                        store.numberOfSucessfulOrders;
                    data.numberOfFailedOrders = store.numberOfFailedOrders;
                }

                return dispatch(addStore(data));
            }

            case 'product': {
                //
                return dispatch(addProduct(data));
            }
        }
    };

    return [updateDispatch];
};

export default useUpdateDispatch;
