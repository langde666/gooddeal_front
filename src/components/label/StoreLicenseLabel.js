const StoreLicenseLabel = ({ isActive = false, detail = true }) => (
    <span className="position-relative d-inline-block">
        {isActive ? (
            <span className="badge bg-info cus-tooltip">
                <i className="fas fa-check-circle"></i>
                {detail && <span className="ms-2">licensed</span>}
            </span>
        ) : (
            <span className="badge bg-danger cus-tooltip">
                <i className="fas fa-times-circle"></i>
                {detail && <span className="ms-2">unlicensed</span>}
            </span>
        )}
        {isActive ? (
            <small className="cus-tooltip-msg">
                This store is licensed by GoodDeal!
            </small>
        ) : (
            <small className="cus-tooltip-msg">
                This store is banned by GoodDeal, contact us for more
                information!
            </small>
        )}
    </span>
);

export default StoreLicenseLabel;
