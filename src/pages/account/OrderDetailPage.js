import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import AccountLayout from '../../components/layout/AccountLayout';
import OrderDetailInfo from '../../components/info/OrderDetailInfo';

const OrderDetailPage = (props) => {
    const user = useSelector((state) => state.account.user);
    const { orderId } = useParams();
    return (
        <AccountLayout user={user}>
            <div className="purchase-history-order-detail-page mt-2">
                <OrderDetailInfo orderId={orderId} />

                <div className="mt-4">
                    <Link
                        to="/account/purchase"
                        className="text-decoration-none cus-link-hover"
                    >
                        <i className="fas fa-arrow-circle-left"></i> Back to
                        Purchase History
                    </Link>
                </div>
            </div>
        </AccountLayout>
    );
};

export default OrderDetailPage;
