import { useSelector } from "react-redux";
import Input from "../../ui/Input";

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

const AccountInfo = (props) => {
    const { role, createdAt } = useSelector(state => state.user.user);

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
                {role == 'user' ? (<span className='badge bg-primary'>
                    <i className="fas fa-user"></i>
                </span>) : (<span className='badge bg-info'>
                    <i className="fas fa-user-tie"></i>
                </span>)}
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

export default AccountInfo;