import { useSelector, useDispatch } from 'react-redux';
import { addAccount } from '../actions/account';
import { addVendor } from '../actions/vendor';
import { addUser } from '../actions/user';
import { addStore } from '../actions/store';
import { addProduct } from '../actions/product';
import { getNumberOfFollowers } from '../apis/follow';

const useUpdateDispatch = () => {
    const account = useSelector((state) => state.account.user);
    const vendor = useSelector((state) => state.vendor.store);
    const user = useSelector((state) => state.user.user);
    const store = useSelector((state) => state.store.store);
    const product = useSelector((state) => state.product.product);

    const dispatch = useDispatch();

    const updateDispatch = async (name, data) => {
        switch (name) {
            case 'account': {
                data.level = account.level;
                data.numberOfSucessfulOrders = account.numberOfSucessfulOrders;
                data.numberOfFailedOrders = account.numberOfFailedOrders;
                return dispatch(addAccount(data));
            }

            case 'vendor': {
                data.level = vendor.level;
                data.numberOfSucessfulOrders = vendor.numberOfSucessfulOrders;
                data.numberOfFailedOrders = vendor.numberOfFailedOrders;
                data.numberOfFollowers = vendor.numberOfFollowers;
                return dispatch(addVendor(data));
            }

            case 'user': {
                data.level = user.level;
                data.numberOfSucessfulOrders = user.numberOfSucessfulOrders;
                data.numberOfFailedOrders = user.numberOfFailedOrders;
                return dispatch(addUser(data));
            }

            case 'store': {
                data.level = store.level;
                data.numberOfSucessfulOrders = store.numberOfSucessfulOrders;
                data.numberOfFailedOrders = store.numberOfFailedOrders;
                if (typeof data.isFollowing == 'boolean') {
                    try {
                        const resData = await getNumberOfFollowers(data._id);
                        data.numberOfFollowers = resData.count;
                    } catch {
                        const currentNumberOfFollowers =
                            store.numberOfFollowers;
                        data.numberOfFollowers = data.isFollowing
                            ? currentNumberOfFollowers + 1
                            : currentNumberOfFollowers - 1;
                    }
                } else {
                    data.isFollowing = store.isFollowing;
                    data.numberOfFollowers = store.numberOfFollowers;
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
