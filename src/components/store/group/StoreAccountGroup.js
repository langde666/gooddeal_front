import Paragraph from "../../ui/Paragraph";

const humanReadableDate = (date) => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    date = new Date(date);
    return date.getFullYear() + ' ' +
        months[date.getMonth()] + ' ' +
        date.getDate() + ', ' +
        days[date.getDay()] + ' ' +
        date.getHours() + ':' +
        date.getMinutes();
}
const commissionIcons = {
    "small business": <i className="fas fa-cash-register me-2"></i>,
    "business": <i className="fas fa-building me-2"></i>,
};

const StoreAccountGroup = ({ commissionId, createdAt }) => (
    <div className="profile-form row py-2 border border-primary rounded-3">
        <div className="col-6">
            <Paragraph
                label="Business type"
                value={commissionId && commissionId.name}
            />
        </div>

        <div className="col-6 mt-2">
            <div className="position-relative d-inline-block">
                <span className='badge cus-tooltip bg-primary'>
                    {commissionId && commissionId.name && commissionIcons[commissionId.name]}
                    {commissionId && commissionId.name}
                </span>
                <small className='cus-tooltip-msg'>
                    {commissionId && commissionId.name && commissionId.name.charAt(0).toUpperCase() + commissionId.name.slice(1)} - Commission: {commissionId && commissionId.cost && (commissionId.cost.$numberDecimal * 100).toFixed(2)}%
                </small>
            </div>
        </div>

        <div className="col-12">
            <Paragraph
                label="Joined"
                value={humanReadableDate(createdAt)}
            />
        </div>
    </div>
);

export default StoreAccountGroup;