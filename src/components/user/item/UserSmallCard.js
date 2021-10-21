import { Link } from 'react-router-dom';
const IMG = process.env.REACT_APP_STATIC_URL;

const UserSmallCard = ({ user, isSmall = false }) => {
    return (
        <Link
            className="user-small-card text-reset text-decoration-none"
            to={`/user/${user._id}`}
            target="_blank"
        >
            <img
                src={`${IMG + user.avatar}`}
                className="user-small-img"
            />

            <span className={`user-small-name noselect ${isSmall ? 'user-small-name--limit-name' : ''}`}>
                {user.firstname + ' ' + user.lastname}
            </span>
        </Link>
    );
}

export default UserSmallCard;