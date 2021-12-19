import { Link } from 'react-router-dom';
const IMG = process.env.REACT_APP_STATIC_URL;

const UserSmallCard = ({
    user = {},
    bodername = false,
    style = {},
    link = `/user/${user._id}`,
}) => (
    <span
        className={`d-inline-flex align-items-center ${
            bodername && 'bg-body shadow'
        }`}
        style={style}
    >
        <Link
            className="text-reset text-decoration-none me-2"
            title={user.firstname + ' ' + user.lastname}
            to={link}
        >
            <img
                src={`${IMG + user.avatar}`}
                className="small-card-img"
                alt={user.firstname + ' ' + user.lastname}
            />
        </Link>

        <Link
            className="text-reset link-hover mt-2"
            title={user.firstname + ' ' + user.lastname}
            to={link}
            style={style}
        >
            <span className="fs-6 fw-bold">
                {user.firstname + ' ' + user.lastname}
            </span>
        </Link>
    </span>
);

export default UserSmallCard;
