const shields = {
    "normal": "#C0C0C0",
    "premium": "#FFD700",
}

const StoreLevelLabel = ({ level = {}, detail = true }) => (
    <span className="position-relative d-inline-block">
        <span className='badge cus-tooltip' style={{ backgroundColor: shields[level.name] }}>
            <i className={`fas fa-shield-alt ${detail ? 'me-2' : ''}`}></i>
            {detail && level.name}
        </span>
        {!detail ? (
            <small className='cus-tooltip-msg'>{level.name}</small>
        ) : (
            <small className='cus-tooltip-msg'>
                Floor point: {level.minPoint} - Discount: {level.discount && (level.discount.$numberDecimal * 100).toFixed(2)}%
            </small>
        )}
    </span>
);

export default StoreLevelLabel;