const StoreStatusLabel = ({ isOpen = true, detail = true }) => (
    <div className="d-inline-block position-relative">
        <span className={`badge ${isOpen ? 'bg-info' : 'bg-danger'} cus-tooltip`}>
            {isOpen ? (
                <span><i className="fas fa-door-open me-1"></i>{detail && <span>open</span>}</span>
            ) : (
                <span><i className="fas fa-door-closed me-1"></i>{detail && <span>closed</span>}</span>
            )}
        </span>
        <small className="cus-tooltip-msg">
            {isOpen ?
                'This store is open, can order in this time.' :
                'This store is closed, can\'t order in this time'}
        </small>
    </div>
);

export default StoreStatusLabel;