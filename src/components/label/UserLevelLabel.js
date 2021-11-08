const shields = {
    bronze: '#CD7F32',
    silver: '#C0C0C0',
    gold: '#FFD700',
    diamond: '#82aeb3',
};

const UserLevelLabel = ({ level = {}, detail = true }) => (
    <span className="position-relative d-inline-block">
        <span
            className='badge cus-tooltip'
            style={{ backgroundColor: level.color }}
        >
            <i className="fas fa-shield-alt"></i>
            {detail && <span className="ms-2">{level.name}</span>}
        </span>

        {!detail ? (
            <small className="cus-tooltip-msg">{level.name}</small>
        ) : (
            <small className="cus-tooltip-msg">
                Floor point: {level.minPoint} - Discount:{' '}
                {level.discount && level.discount.$numberDecimal}%
            </small>
        )}
    </span>
);

export default UserLevelLabel;
