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
        <div className="order-detail-info position-relative">
            {isloading && <Loading />}

            <div className="mb-3 d-flex justify-content-start align-items-center">
                <h4 className="m-0">Order #{order._id}</h4>
                <span className="fs-6 ms-2">
                    <OrderStatusLabel status={order.status} />
                </span>
            </div>

            {error && <Error msg={error} />}

            <div className="row py-2 border border-primary rounded-3 mb-2">
                <div className="col-6">
                    <Paragraph
                        label="Created at"
                        value={humanReadableDate(order.createdAt)}
                    />
                </div>

                <div className="col-6">
                    <Paragraph
                        label="Seller"
                        value={<StoreSmallCard store={order.storeId} />}
                    />
                </div>
            </div>

            <div className="row py-2 border border-primary rounded-3 mb-2">
                <div className="col-6">
                    <Paragraph
                        label="Receiver"
                        value={<UserSmallCard user={order.userId} />}
                    />
                </div>

                <div className="col-6">
                    <Paragraph label="Phone" value={order.phone} />
                </div>

                <div className="col-12">
                    <Paragraph label="To address" value={order.address} />
                </div>
            </div>

            <div className="row py-2 border border-primary rounded-3 mb-2">
                {order.deliveryId && (
                    <div className="col-12">
                        <Paragraph
                            label="Delivery unit"
                            value={
                                <span>
                                    {order.deliveryId.name} -{' '}
                                    {order.deliveryId.price.$numberDecimal} VND
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

            <div className="row py-2 border border-primary rounded-3">
                <ListOrderItems orderId={orderId} storeId={storeId} by={by} />

                <div className="col-12 mt-2 d-flex justify-content-end">
                    <div className="me-5">
                        <Paragraph
                            label="Final total (include discounts)"
                            value={
                                <h5 className="text-primary">
                                    {formatPrice(
                                        order.amountFromUser &&
                                            order.amountFromUser.$numberDecimal,
                                    )}{' '}
                                    VND
                                </h5>
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetailInfo;
