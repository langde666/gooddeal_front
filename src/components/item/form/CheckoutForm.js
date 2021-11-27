import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getToken } from '../../../apis/auth';
import { createOrder } from '../../../apis/order';
import { listActiveDeliveries } from '../../../apis/delivery';
import { getStoreLevel } from '../../../apis/level';
import { getCommissionByStore } from '../../../apis/commission';
import Loading from '../../ui/Loading';
import Error from '../../ui/Error';
import ConfirmDialog from '../../ui/ConfirmDialog';
import UserAddAddressItem from '../../item/UserAddAddressItem';
import useUpdateDispatch from '../../../hooks/useUpdateDispatch';
import { regexTest } from '../../../helper/test';
import {
    totalDelivery,
    totalProducts,
    totalCommission,
} from '../../../helper/total';
import { formatPrice } from '../../../helper/formatPrice';
import Logo from '../../layout/menu/Logo';
import Input from '../../ui/Input';
import DropDownMenu from '../../ui/DropDownMenu';
import UserLevelLabel from '../../label/UserLevelLabel';

const CheckoutForm = ({
    cartId = '',
    storeId = '',
    userId = '',
    items = {},
}) => {
    const [isloading, setIsLoading] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);
    const [error, setError] = useState('');
    const [error1, setError1] = useState('');

    const [updateDispatch] = useUpdateDispatch();
    const history = useHistory();

    const {
        addresses,
        phone,
        level: userLevel,
    } = useSelector((state) => state.account.user);
    const [deliveries, setDeliveries] = useState([]);
    const [order, setOrder] = useState({});

    const init = async () => {
        try {
            const res = await listActiveDeliveries();
            const res1 = await getStoreLevel(storeId);
            const res2 = await getCommissionByStore(storeId);

            setDeliveries(res.deliveries);
            const { deliveryPrice, amountFromUser2 } = totalDelivery(
                res.deliveries[0],
                userLevel,
            );
            const { totalPrice, totalPromotionalPrice, amountFromUser1 } =
                totalProducts(items, userLevel);
            // console.log(res1.level, res2.commission);
            const { amountFromStore, amountToStore } = totalCommission(
                items,
                res1.level,
                res2.commission,
            );

            setOrder({
                phone,
                address: addresses[0],
                isValidPhone: true,
                cartId,
                isPaidBefore: false,
                delivery: res.deliveries[0],
                deliveryId: res.deliveries[0]._id,
                deliveryPrice,
                amountFromUser2,
                totalPrice,
                totalPromotionalPrice,
                amountFromUser1,
                amountFromUser: amountFromUser1 + amountFromUser2,
                amountFromStore,
                amountToStore,
                commissionId: res2.commission._id,
                amountToGD: amountFromUser1 + amountFromUser2 - amountToStore,
            });
        } catch (e) {
            setError('Server Error');
        }
    };

    useEffect(() => {
        init();
    }, [cartId, userId, storeId, items, addresses, phone, userLevel]);

    const handleChange = (name, isValidName, value) => {
        setOrder({
            ...order,
            [name]: value,
            [isValidName]: true,
        });
    };

    const handleValidate = (isValidName, flag) => {
        setOrder({
            ...order,
            [isValidName]: flag,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const {
            cartId,
            deliveryId,
            commissionId,
            address,
            phone,
            amountFromUser,
            amountFromStore,
            amountToStore,
            amountToGD,
        } = order;

        if (
            !cartId ||
            !deliveryId ||
            !commissionId ||
            !address ||
            !phone ||
            !amountFromUser ||
            !amountFromStore ||
            !amountToStore ||
            !amountToGD
        ) {
            setOrder({
                ...order,
                isValidPhone: regexTest('phone', order.phone),
            });
            return;
        }

        if (!order.isValidPhone) return;

        setIsConfirming(true);
    };

    const onSubmit = () => {
        const { _id, accessToken } = getToken();

        const {
            phone,
            address,
            deliveryId,
            commissionId,
            amountFromUser,
            amountFromStore,
            amountToStore,
            amountToGD,
            isPaidBefore,
        } = order;

        const orderBody = {
            phone,
            address,
            deliveryId,
            commissionId,
            amountFromUser,
            amountFromStore,
            amountToStore,
            amountToGD,
            isPaidBefore,
        };

        console.log('order', orderBody);

        setError('');
        setIsLoading(true);
        createOrder(_id, accessToken, cartId, orderBody)
            .then((data) => {
                if (data.error) setError(data.error);
                else {
                    updateDispatch('account', data.user);
                    history.push('/account/purchase');
                }
                setIsLoading(false);
            })
            .catch((error) => {
                setError('Server Error');
                setTimeout(() => {
                    setError('');
                }, 3000);
                setIsLoading(false);
            });
    };

    return (
        <div className="create-order-form-wrap position-relative">
            {isloading && <Loading />}
            {isConfirming && (
                <ConfirmDialog
                    title="Order"
                    onSubmit={onSubmit}
                    onClose={() => setIsConfirming(false)}
                />
            )}

            <form
                className="create-order-form border border-primary rounded-3 row mb-2"
                onSubmit={handleSubmit}
            >
                <div className="col-12 bg-primary p-3">
                    <Logo />
                    <p className="text-white ms-2 fw-light">
                        Proceed to checkout
                    </p>
                </div>

                <div className="col-12 px-4 mt-2 d-flex justify-content-between align-items-end">
                    <div className="flex-grow-1">
                        <Input
                            type="text"
                            label="Phone"
                            value={order.phone}
                            isValid={order.isValidPhone}
                            feedback="Please provide a valid shop name."
                            validator="name"
                            onChange={(value) =>
                                handleChange('phone', 'isValidPhone', value)
                            }
                            onValidate={(flag) =>
                                handleValidate('isValidPhone', flag)
                            }
                        />
                    </div>

                    <div className="d-inline-block position-relative ms-4">
                        <div className="d-inline-block cus-tooltip">
                            <button
                                className="btn btn-primary ripple"
                                type="button"
                                disabled={!!!phone}
                                onClick={() =>
                                    setOrder({
                                        ...order,
                                        phone: phone,
                                        isValidPhone: true,
                                    })
                                }
                            >
                                <i className="fas fa-phone-square-alt me-2"></i>
                                Set default
                            </button>
                        </div>
                        <small className="cus-tooltip-msg">
                            Use registered phone number
                        </small>
                    </div>
                </div>

                <div className="col-12 px-4 mt-2 d-flex justify-content-between align-items-end">
                    <div className="flex-grow-1">
                        <DropDownMenu
                            listItem={
                                addresses &&
                                addresses.map((a, i) => {
                                    const newA = {
                                        value: a,
                                        label: a,
                                    };
                                    return newA;
                                })
                            }
                            value={order.address}
                            setValue={(address) =>
                                setOrder({
                                    ...order,
                                    address: address,
                                })
                            }
                            size="large"
                            label="Address"
                        />
                        {addresses && addresses.length <= 0 && (
                            <small
                                style={{ marginTop: '-20px', display: 'block' }}
                            >
                                <Error msg="No address to choose, please add your address first!" />
                            </small>
                        )}
                    </div>
                    <div className="mb-2 ms-4">
                        <UserAddAddressItem
                            count={addresses && addresses.length}
                        />
                    </div>
                </div>

                <div className="col-12 px-4 mt-2">
                    {error1 && <Error msg={error1} />}
                    {!error1 && (
                        <DropDownMenu
                            listItem={
                                deliveries &&
                                deliveries.map((d, i) => {
                                    const newD = {
                                        value: d,
                                        label:
                                            d.name +
                                            ' (' +
                                            d.price.$numberDecimal +
                                            ' VND)',
                                    };
                                    return newD;
                                })
                            }
                            value={order.delivery}
                            setValue={(delivery) => {
                                const { deliveryPrice, amountFromUser2 } =
                                    totalDelivery(delivery, userLevel);
                                setOrder({
                                    ...order,
                                    delivery,
                                    deliveryId: delivery._id,
                                    deliveryPrice,
                                    amountFromUser2,
                                    amountFromUser:
                                        order.amountFromUser1 + amountFromUser2,
                                    amountToGD:
                                        order.amountFromUser1 +
                                        amountFromUser2 -
                                        order.amountToStore,
                                });
                            }}
                            size="large"
                            label="Delivery unit"
                        />
                    )}
                </div>

                {error && (
                    <div className="col-12">
                        <Error msg={error} />
                    </div>
                )}

                <div className="d-flex justify-content-between mt-4">
                    <div className="ms-4">checkbox...</div>

                    <div className="me-4">
                        <div className="d-flex justify-content-between align-items-end">
                            <h3 className="mx-2 fs-6">Product's total:</h3>

                            <div className="d-flex align-items-end">
                                <div className="mx-2">
                                    <p className="text-decoration-line-through text-muted">
                                        {formatPrice(order.totalPrice)} VND
                                    </p>

                                    <h4 className="text-decoration-line-through text-primary fs-5">
                                        {formatPrice(
                                            order.totalPromotionalPrice,
                                        )}{' '}
                                        VND
                                    </h4>
                                </div>

                                <div className="mx-2">
                                    <small>
                                        <UserLevelLabel level={userLevel} />
                                    </small>

                                    <h4 className="text-primary fs-5">
                                        {formatPrice(order.amountFromUser1)} VND
                                    </h4>
                                </div>
                            </div>
                        </div>

                        <div className="d-flex justify-content-between align-items-end mt-2">
                            <h3 className="mx-2 fs-6">Delivery's total:</h3>

                            <div className="d-flex align-items-end">
                                <div className="mx-2">
                                    <h4 className="text-decoration-line-through text-primary fs-5">
                                        {formatPrice(order.deliveryPrice)} VND
                                    </h4>
                                </div>

                                <div className="mx-2">
                                    <small>
                                        <UserLevelLabel level={userLevel} />
                                    </small>

                                    <h4 className="text-primary fs-5">
                                        {formatPrice(order.amountFromUser2)} VND
                                    </h4>
                                </div>
                            </div>
                        </div>

                        <div className="d-flex justify-content-between align-items-end mt-4">
                            <h3 className="mx-2 fs-6">Total:</h3>
                            <div className="mx-2">
                                <h4 className="text-primary fs-5">
                                    {formatPrice(order.amountFromUser)} VND
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 px-4 pb-3 d-flex justify-content-end  align-items-center mt-4">
                    <button
                        type="submit"
                        className="btn btn-primary ripple"
                        onClick={handleSubmit}
                        style={{ width: '40%' }}
                    >
                        Only order
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CheckoutForm;
