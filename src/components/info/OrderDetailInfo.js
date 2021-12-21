import { useState, useEffect } from 'react';
import { getToken } from '../../apis/auth';
import {
    getOrderByUser,
    getOrderByStore,
    getOrderForAdmin,
} from '../../apis/order';
import { humanReadableDate } from '../../helper/humanReadable';
import { formatPrice } from '../../helper/formatPrice';
import Loading from '../ui/Loading';
import Error from '../ui/Error';
import OrderStatusLabel from '../label/OrderStatusLabel';
import Paragraph from '../ui/Paragraph';
import UserSmallCard from '../card/UserSmallCard';
import StoreSmallCard from '../card/StoreSmallCard';
import ListOrderItems from '../list/ListOrderItems';

const OrderDetailInfo = ({ orderId = '', storeId = '', by = 'user' }) => {
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const [order, setOrder] = useState({});

    const init = () => {
        const { _id, accessToken } = getToken();
        setError('');
        setIsLoading(true);

        if (by === 'store')
            getOrderByStore(_id, accessToken, orderId, storeId)
                .then((data) => {
                    if (data.error) setError(data.error);
                    else setOrder(data.order);
                    setIsLoading(false);
                })
                .catch((error) => {
                    setError('Server Error');
                    setIsLoading(false);
                });
        else if (by === 'admin')
            getOrderForAdmin(_id, accessToken, orderId)
                .then((data) => {
                    if (data.error) setError(data.error);
                    else setOrder(data.order);
                    setIsLoading(false);
                })
                .catch((error) => {
                    setError('Server Error');
                    setIsLoading(false);
                });
        else
            getOrderByUser(_id, accessToken, orderId)
                .then((data) => {
                    if (data.error) setError(data.error);
                    else setOrder(data.order);
                    setIsLoading(false);
                })
                .catch((error) => {
                    setError('Server Error');
                    setIsLoading(false);
                });
    };

    useEffect(() => {
        init();
    }, [orderId, storeId, by]);

    return (
        <div className="position-relative">
            {isloading && <Loading />}

            <div className="mb-3 d-flex flex-wrap justify-content-start align-items-center">
                <h4 className="mx-4 mb-0">Order #{order._id}</h4>
                <span className="fs-6 mx-4">
                    <OrderStatusLabel status={order.status} />
                </span>
            </div>

            {error && <Error msg={error} />}

            <div className="container-fluid mb-2">
                <div className="row py-2 border border-primary rounded-3">
                    <div className="col-sm-6">
                        <Paragraph
                            label="Created at"
                            value={humanReadableDate(order.createdAt)}
                        />
                    </div>

                    <div className="col-sm-6">
                        <Paragraph
                            label="Seller"
                            value={<StoreSmallCard store={order.storeId} />}
                        />
                    </div>
                </div>
            </div>

            <div className="container-fluid mb-2">
                <div className="row py-2 border border-primary rounded-3">
                    <div className="col-sm-6">
                        <Paragraph
                            label="Receiver"
                            value={<UserSmallCard user={order.userId} />}
                        />
                    </div>

                    <div className="col-sm-6">
                        <Paragraph label="Phone" value={order.phone} />
                    </div>

                    <div className="col-12">
                        <Paragraph label="To address" value={order.address} />
                    </div>
                </div>
            </div>

            <div className="container-fluid mb-2">
                <div className="row py-2 border border-primary rounded-3">
                    {order.deliveryId && (
                        <div className="col-12">
                            <Paragraph
                                label="Delivery unit"
                                value={
                                    <span>
                                        {order.deliveryId.name} -{' '}
                                        {order.deliveryId.price.$numberDecimal}{' '}
                                        VND
                                    </span>
                                }
                            />
                        </div>
                    )}

                    <div className="col-12">
                        <Paragraph
                            label="Payment"
                            value={
                                order.isPaidBefore
                                    ? 'Online payment'
                                    : 'Payment on delivery'
                            }
                        />
                    </div>
                </div>
            </div>

            <div className="container-fluid mb-2">
                <div className="row py-2 border border-primary rounded-3">
                    <ListOrderItems
                        orderId={orderId}
                        storeId={storeId}
                        by={by}
                        status={order.status}
                    />

                    <div className="col-12 mt-2 d-flex justify-content-end">
                        <div className="me-4">
                            <Paragraph
                                label="Final total (include discounts)"
                                value={
                                    <span className="text-primary fw-bold fs-5">
                                        {formatPrice(
                                            order.amountFromUser &&
                                                order.amountFromUser
                                                    .$numberDecimal,
                                        )}{' '}
                                        VND
                                    </span>
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetailInfo;
