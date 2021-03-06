const ProductStatusLabel = ({ isSelling = true, detail = true }) => (
    <span className="d-inline-block position-relative">
        <span
            className={`badge ${
                isSelling ? 'bg-info' : 'bg-danger'
            } cus-tooltip`}
        >
            {isSelling ? (
                <span>
                    <i className="fas fa-box"></i>
                    {detail && <span className="ms-2">selling</span>}
                </span>
            ) : (
                <span>
                    <i className="fas fa-archive"></i>
                    {detail && <span className="ms-2">stored</span>}
                </span>
            )}
        </span>
        <small className="cus-tooltip-msg">
            {isSelling
                ? 'This product is selling, can order in this time.'
                : "This product is stored, can't order in this time"}
        </small>
    </span>
);

export default ProductStatusLabel;
