const StoreStatusLabel = ({ isOpen = true, detail = true }) => (
    <span className="d-inline-block position-relative">
        <span
            className={`badge ${isOpen ? 'bg-info' : 'bg-danger'} cus-tooltip`}
        >
            {isOpen ? (
                <span>
                    <i className="fas fa-door-open"></i>
                    {detail && <span className="ms-2">open</span>}
                </span>
            ) : (
                <span>
                    <i className="fas fa-door-closed"></i>
                    {detail && <span className="ms-2">closed</span>}
                </span>
            )}
        </span>
        <small className="cus-tooltip-msg">
            {isOpen
                ? 'This store is open, can order in this time.'
                : "This store is closed, can't order in this time"}
        </small>
    </span>
);

export default StoreStatusLabel;
