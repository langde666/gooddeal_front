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

const UserAccountGroup = ({ user = {} }) => (
    <div className="profile-form row py-2 border border-primary rounded-3">
        <div className="col-6">
            <Paragraph
                label="Role"
                value={user.role}
            />
        </div>

        <div className="col-6 mt-2">
            <div className="position-relative d-inline-block">
                {user.role == 'user' ? (
                    <span className='badge bg-primary cus-tooltip'>
                        <i className="fas fa-user me-2"></i>{user.role}
                    </span>
                ) : (
                    <span className='badge bg-info cus-tooltip'>
                        <i className="fas fa-user-tie me-2"></i>{user.role}
                    </span>
                )}
                <small className="cus-tooltip-msg">Role: {user.role}</small>
            </div>

        </div>

        <div className="col-12">
            <Paragraph
                label="Joined"
                value={humanReadableDate(user.createdAt)}
            />
        </div>
    </div>
);

export default UserAccountGroup;