const OrderPaymentLabel = ({ isPaidBefore = false, detail = true }) => (
    <span className="position-relative d-inline-block">
        {isPaidBefore ? (
            <span className="badge bg-warning cus-tooltip">
                <i className="fab fa-paypal"></i>
                {detail && <span className="ms-2">Paypal</span>}
            </span>
        ) : (
            <span className="badge bg-primary cus-tooltip">
                <i className="fas fa-people-carry"></i>
                {detail && <span className="ms-2">on delivery</span>}
            </span>
        )}
        {isPaidBefore ? (
            <small className="cus-tooltip-msg">Payment with paypal</small>
        ) : (
            <small className="cus-tooltip-msg">Payment on delivery</small>
        )}
    </span>
);

export default OrderPaymentLabel;
