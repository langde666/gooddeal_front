import { Link } from 'react-router-dom';
const IMG = process.env.REACT_APP_STATIC_URL;

const UserSmallCard = ({ user = {}, bodername = false, style = {} }) => (
    <div
        className={`d-inline-flex align-items-center ${
            bodername && 'bg-body shadow'
        }`}
        style={style}
    >
        <Link
            className="text-reset text-decoration-none me-2"
            to={`/user/${user._id}`}
        >
            <img
                src={`${IMG + user.avatar}`}
                className="small-card-img"
                alt={user.firstname + ' ' + user.lastname}
            />
        </Link>

        <Link
            className="text-reset text-decoration-none link-hover mt-2"
            to={`/user/${user._id}`}
            style={style}
        >
            <h6 className="">{user.firstname + ' ' + user.lastname}</h6>
        </Link>
    </div>
);

export default UserSmallCard;
