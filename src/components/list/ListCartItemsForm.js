import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getToken } from '../../apis/auth';
import {
    listItemsByCart,
    removeFromCart,
    updateCartItem,
} from '../../apis/cart';
import { totalProducts } from '../../helper/total';
import { formatPrice } from '../../helper/formatPrice';
import useUpdateDispatch from '../../hooks/useUpdateDispatch';
import useToggle from '../../hooks/useToggle';
import Loading from '../ui/Loading';
import Error from '../ui/Error';
import Success from '../ui/Success';
import ConfirmDialog from '../ui/ConfirmDialog';
import DropDownMenu from '../ui/DropDownMenu';
import UserLevelLabel from '../label/UserLevelLabel';
import CheckoutForm from '../item/form/CheckoutForm';

const IMG = process.env.REACT_APP_STATIC_URL;

const ListCartItems = ({ cartId = '', storeId = '', userId = '', onRun }) => {
    const [isloading, setIsLoading] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [run, setRun] = useState(false);
    const [showCheckoutFlag, toogleShowCheckoutFlag] = useToggle(false);

    const { level } = useSelector((state) => state.account.user);
    const [updateDispatch] = useUpdateDispatch();

    const [items, setItems] = useState([]);
    const [removedItem, setRemovedItem] = useState({});
    const [totals, setTotals] = useState({
        totalPrice: 0,
        totalPromotionalPrice: 0,
        amountFromUser1: 0,
    });

    const init = () => {
        const { _id, accessToken } = getToken();
        setError('');
        setSuccess('');
        setIsLoading(true);
        listItemsByCart(_id, accessToken, cartId)
            .then(async (data) => {
                if (data.error) setError(data.error);
                else {
                    setItems(data.items);
                    const {
                        totalPrice,
                        totalPromotionalPrice,
                        amountFromUser1,
                    } = totalProducts(data.items, level);
                    setTotals({
                        totalPrice,
                        totalPromotionalPrice,
                        amountFromUser1,
                    });
                }
                setIsLoading(false);
            })
            .catch((error) => {
                setError('Server Error');
                setIsLoading(false);
            });
    };

    useEffect(() => {
        if (cartId) init();
    }, [cartId, storeId, userId, level, run]);

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

    const handleUpdate = (value, item) => {
        // console.log(value, item);
        const { _id, accessToken } = getToken();
        setError('');
        setSuccess('');
        setIsLoading(true);
        updateCartItem(_id, accessToken, { count: value }, item._id)
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
                            className="text-reset text-decoration-none link-hover d-block mt-1"
                            to={`/product/${
                                item.productId && item.productId._id
                            }`}
                            title={item.productId && item.productId.name}
                        >
                            <h3 className="fs-5">
                                {item.productId && item.productId.name}
                            </h3>
                        </Link>

                        <div className="mt-2">
                            {item.styleValueIds &&
                                item.styleValueIds.map((value, index) => (
                                    <p className="fs-6" key={index}>
                                        {value.styleId && value.styleId.name}:{' '}
                                        {value.name}
                                    </p>
                                ))}
                        </div>

                        <div className="mt-2">
                            <p className="text-decoration-line-through text-muted">
                                {item.productId &&
                                    item.productId.price &&
                                    formatPrice(
                                        item.productId &&
                                            item.productId.price.$numberDecimal,
                                    )}{' '}
                                VND
                            </p>

                            <h4 className="text-primary fs-5">
                                {item.productId &&
                                    item.productId.promotionalPrice &&
                                    formatPrice(
                                        item.productId &&
                                            item.productId.promotionalPrice
                                                .$numberDecimal,
                                    )}{' '}
                                VND x {item.count}
                            </h4>
                        </div>

                        {item.productId && !item.productId.isActive && (
                            <Error msg="The product is banned by GoodDeal!" />
                        )}

                        {item.productId &&
                            item.productId.isActive &&
                            !item.productId.isSelling && (
                                <Error msg="The product is out of business, please remove it from your cart, you can continue with others!" />
                            )}

                        {item.productId &&
                            item.productId.isActive &&
                            item.productId.isSelling &&
                            item.productId.quantity <= 0 && (
                                <Error msg="The product is sold out, please remove it from your cart, you can continue with others!" />
                            )}

                        {item.productId &&
                            item.productId.isActive &&
                            item.productId.isSelling &&
                            item.productId.quantity > 0 &&
                            item.productId.quantity < item.count && (
                                <Error
                                    msg={`Only ${item.productId.quantity} products left, please update the count!`}
                                />
                            )}
                    </div>

                    <div className="d-flex justify-content-between align-items-center my-2">
                        {item.productId &&
                            item.productId.isActive &&
                            item.productId.isSelling &&
                            item.productId.quantity > 0 && (
                                <div className="px-2">
                                    <DropDownMenu
                                        listItem={
                                            item.productId &&
                                            item.productId.quantity &&
                                            Array.from(
                                                {
                                                    length: item.productId
                                                        .quantity,
                                                },
                                                (_, i) => {
                                                    return {
                                                        value: i + 1,
                                                        label: i + 1,
                                                    };
                                                },
                                            )
                                        }
                                        resetDefault={false}
                                        value={item.count}
                                        setValue={(value) =>
                                            handleUpdate(value, item)
                                        }
                                        borderBtn={true}
                                    />
                                </div>
                            )}

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

            {items.reduce(
                (prev, item) =>
                    prev &&
                    item.productId &&
                    item.productId.isActive &&
                    item.productId.isSelling &&
                    item.productId.quantity > 0 &&
                    item.productId.quantity >= item.count,
                true,
            ) && (
                <div className="d-flex justify-content-end align-items-center">
                    {!showCheckoutFlag && (
                        <>
                            <div className="me-4">
                                <p className="text-decoration-line-through text-muted">
                                    {formatPrice(totals.totalPrice)} VND
                                </p>

                                <h4 className="text-decoration-line-through text-primary fs-5">
                                    {formatPrice(totals.totalPromotionalPrice)}{' '}
                                    VND
                                </h4>
                            </div>

                            <div className="me-4">
                                <small>
                                    <UserLevelLabel level={level} />
                                </small>

                                <h4 className="text-primary fs-5">
                                    {formatPrice(totals.amountFromUser1)} VND
                                </h4>
                            </div>
                        </>
                    )}

                    <button
                        className={`btn ${
                            showCheckoutFlag
                                ? 'btn-primary'
                                : 'btn-outline-primary'
                        } ripple`}
                        type="button"
                        onClick={toogleShowCheckoutFlag}
                    >
                        Proceed to checkout
                    </button>
                </div>
            )}

            {showCheckoutFlag && (
                <div className="mx-3 mt-2">
                    <CheckoutForm
                        cartId={cartId}
                        userId={userId}
                        storeId={storeId}
                        items={items}
                    />
                </div>
            )}
        </div>
    );
};

export default ListCartItems;
