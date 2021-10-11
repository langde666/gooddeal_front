import Input from "./Input";

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

const AccountInfoVisit = ({ role, createdAt }) => {
    return (
        <div className="profile-form row py-2 border border-primary rounded-3">
            <div className="col-6">
                <Input
                    type="text"
                    label="Role"
                    value={role}
                    isDisabled={true}
                />
            </div>

            <div className="col-6 mt-2">
                <div className="position-relative d-inline-block">
                    {role == 'user' ? (
                        <span className='badge bg-primary cus-tooltip'>
                            <i className="fas fa-user"></i>
                        </span>
                    ) : (
                        <span className='badge bg-info cus-tooltip'>
                            <i className="fas fa-user-tie"></i>
                        </span>
                    )}
                    <small className="cus-tooltip-msg">Role: {role}</small>
                </div>

            </div>

            <div className="col-12">
                <Input
                    type="text"
                    label="Joined"
                    value={humanReadableDate(createdAt)}
                    isDisabled={true}
                />
            </div>
        </div>
    );
}

export default AccountInfoVisit;