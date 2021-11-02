const commissionIcons = {
    "small business": <i className="fas fa-cash-register"></i>,
    "business": <i className="fas fa-building"></i>,
};

const StoreCommissionLabel = ({ commission = {}, detail = true }) => (
    <span className="position-relative d-inline-block">
        <span className='badge bg-primary cus-tooltip'>
            {commissionIcons[commission.name]}
            {detail && <span className='ms-2'>{commission.name}</span>}
        </span>

        {!detail ? (
            <small className='cus-tooltip-msg'>{commission.name}</small>
        ) : (
            <small className='cus-tooltip-msg'>
                {commission.name && commission.name.charAt(0).toUpperCase() + commission.name.slice(1)} - Commission: {(
                    commission.cost && commission.cost.$numberDecimal && commission.cost.$numberDecimal * 100).toFixed(2)}%
            </small>
        )}
    </span>
);

export default StoreCommissionLabel;