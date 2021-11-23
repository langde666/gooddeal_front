import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { getToken } from '../../../apis/auth';
import { listActiveDeliveries } from '../../../apis/delivery';
import Loading from '../../ui/Loading';
import Error from '../../ui/Error';
import Success from '../../ui/Success';
import ConfirmDialog from '../../ui/ConfirmDialog';
import UserAddAddressItem from '../../item/UserAddAddressItem';
import { regexTest } from '../../../helper/test';
import Logo from '../../layout/menu/Logo';
import Input from '../../ui/Input';
import DropDownMenu from '../../ui/DropDownMenu';

const CheckoutForm = ({ cartId = '', totals = {} }) => {
    const [isloading, setIsLoading] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);
    const [error, setError] = useState('');
    const [error1, setError1] = useState('');
    const [success, setSuccess] = useState('');

    const { addresses, phone } = useSelector((state) => state.account.user);
    const [deliveries, setDeliveries] = useState([]);
    const [order, setOrder] = useState({});

    const init = () => {
        listActiveDeliveries()
            .then((data) => {
                if (data.error) setError1(data.error);
                else {
                    setDeliveries(data.deliveries);
                    setOrder({
                        address: addresses[0],
                        deliveryId: data.deliveries[0]._id,
                        phone: phone,
                        cartId,
                        totalPrices: totals.totalPrices,
                        totalPromotionalPrices: totals.totalPromotionalPrices,
                        totalPricesForUser: totals.totalPricesForUser,
                        isValidPhone: true,
                    });
                }
            })
            .catch((error) => setError1('Server Error'));
    };

    useEffect(() => {
        init();
    }, [cartId, totals, addresses, phone]);

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

    const handleSelect = (name, value) => {
        setOrder({
            ...order,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const {
            phone,
            address,
            deliveryId,
            cartId,
            totalPrices,
            totalPromotionalPrices,
            totalPricesForUser,
        } = order;

        if (
            !phone ||
            !address ||
            !deliveryId ||
            !cartId ||
            !totalPrices ||
            !totalPromotionalPrices ||
            !totalPricesForUser
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
        console.log('order', order);
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
                        Ordering is easy.
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
                        <button
                            className="btn btn-primary ripple cus-tooltip"
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
                            <i className="fas fa-phone-square-alt me-2"></i>Set
                            default
                        </button>
                        <small className="cus-tooltip-msg">
                            Set your register phone number
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
                            setValue={(value) => handleSelect('address', value)}
                            side="large"
                            label="Address"
                        />
                        {addresses && addresses.length <= 0 && (
                            <small
                                style={{ marginTop: '-20px', display: 'block' }}
                            >
                                <Error msg="Please add your address!" />
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
                                        value: d._id,
                                        label:
                                            d.name +
                                            ' (' +
                                            d.price.$numberDecimal +
                                            ' VND)',
                                    };
                                    return newD;
                                })
                            }
                            value={order.deliveryId}
                            setValue={(value) =>
                                handleSelect('deliveryId', value)
                            }
                            side="large"
                            label="Delivery unit"
                        />
                    )}
                </div>

                {error && (
                    <div className="col-12">
                        <Error msg={error} />
                    </div>
                )}

                <div className="col-12 px-4 pb-3 d-flex justify-content-end align-items-center mt-4">
                    <button
                        type="submit"
                        className="btn btn-primary ripple"
                        onClick={handleSubmit}
                        style={{ width: '40%' }}
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CheckoutForm;
