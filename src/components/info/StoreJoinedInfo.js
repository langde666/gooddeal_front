import Paragraph from '../ui/Paragraph';
import StoreCommissionLabel from '../label/StoreCommissionLabel';

const humanReadableDate = (date) => {
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];
    const days = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ];

    date = new Date(date);
    return (
        date.getFullYear() +
        ' ' +
        months[date.getMonth()] +
        ' ' +
        date.getDate() +
        ', ' +
        days[date.getDay()] +
        ' ' +
        date.getHours() +
        ':' +
        date.getMinutes()
    );
};

const StoreJoinedInfo = ({ store = {} }) => (
    <div className="profile-form row py-2 border border-primary rounded-3">
        <div className="col-12">
            <Paragraph
                label="Type"
                value={<StoreCommissionLabel commission={store.commissionId} />}
            />
        </div>

        <div className="col-12">
            <Paragraph
                label="Joined"
                value={humanReadableDate(store.createdAt)}
            />
        </div>
    </div>
);

export default StoreJoinedInfo;
