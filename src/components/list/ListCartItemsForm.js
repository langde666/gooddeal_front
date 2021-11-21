import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getToken } from '../../apis/auth';
import { listItemsByCard, removeFromCart } from '../../apis/cart';
import useUpdateDispatch from '../../hooks/useUpdateDispatch';
import Loading from '../ui/Loading';
import Error from '../ui/Error';
import Success from '../ui/Success';
import ConfirmDialog from '../ui/ConfirmDialog';

const IMG = process.env.REACT_APP_STATIC_URL;

const ListCartItems = ({ cartId = '', onRun }) => {
    const [isloading, setIsLoading] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [run, setRun] = useState(false);

    const [updateDispatch] = useUpdateDispatch();

    const [items, setItems] = useState([]);
    const [removedItem, setRemovedItem] = useState({});

    const init = () => {
        const { _id, accessToken } = getToken();
        setError('');
        setSuccess('');
        setIsLoading(true);
        listItemsByCard(_id, accessToken, cartId)
            .then((data) => {
                if (data.error) setError(data.error);
                else setItems(data.items);
                setIsLoading(false);
            })
            .catch((error) => {
                setError('Server Error');
                setIsLoading(false);
            });
    };

    useEffect(() => {
        if (cartId) init();
    }, [cartId, run]);

    const handleRemove = (item) => {
        if (!item) return;
        setRemovedItem(item);
        setIsConfirming(true);
    };

    const onSubmit = () => {
        // console.log(removedItem);
        const { _id, accessToken } = getToken();
        setError('');
        setSuccess('');
        setIsLoading(true);
        removeFromCart(_id, accessToken, removedItem._id)
            .then((data) => {
                if (data.error) setError(data.error);
                else {
                    setSuccess(data.success);
                    updateDispatch('account', data.user);
                    setRun(!run);
                    if (onRun) onRun();
                }
                setIsLoading(false);
                setTimeout(() => {
                    setError('');
                    setSuccess('');
                }, 3000);
            })
            .catch((error) => {
                setError('Server Error');
                setTimeout(() => {
                    setError('');
                }, 3000);
            });
    };

    return (
        <div className="list-cart-item position-relative">
            {isloading && <Loading />}
            {error && <Error msg={error} />}
            {success && <Success msg={success} />}
            {isConfirming && (
                <ConfirmDialog
                    title="Remove this product"
                    color="danger"
                    onSubmit={onSubmit}
                    onClose={() => setIsConfirming(false)}
                />
            )}

            {items.map((item, index) => (
                <div key={index} className="d-flex mb-2">
                    <div
                        style={{
                            position: 'relative',
                            paddingBottom: '200px',
                            width: '300px',
                            height: '0',
                        }}
                    >
                        <img
                            src={
                                item.productId &&
                                IMG + item.productId.listImages[0]
                            }
                            alt={item.productId && item.productId.name}
                            style={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                top: '0',
                                left: '0',
                                objectFit: 'cover',
                                borderRadius: '4px',
                            }}
                        />
                    </div>

                    <div className="flex-grow-1 mx-4 my-2">
                        <Link
                            className="text-reset text-decoration-none link-hover d-block mt-1 mb-2"
                            to={`/product/${
                                item.productId && item.productId._id
                            }`}
                            title={item.productId && item.productId.name}
                        >
                            <h3 className="fs-5">
                                {item.productId && item.productId.name}
                            </h3>
                        </Link>

                        <div className="">
                            {item.styleValueIds &&
                                item.styleValueIds.map((value, index) => (
                                    <p className="fs-6" key={index}>
                                        {value.styleId && value.styleId.name}:{' '}
                                        {value.name}
                                    </p>
                                ))}
                        </div>
                    </div>

                    <div className="my-2">
                        <div className="d-inline-block position-relative">
                            <button
                                type="button"
                                className="btn btn-outline-danger ripple cus-tooltip"
                                onClick={() => handleRemove(item)}
                            >
                                <i className="fas fa-trash-alt"></i>
                            </button>
                            <small className="cus-tooltip-msg">
                                Remove from cart
                            </small>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ListCartItems;
