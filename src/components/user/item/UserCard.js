import { Link } from 'react-router-dom';
import UserLevel from '../../user/item/UserLevel';

const IMG = process.env.REACT_APP_STATIC_URL;

const UserCard = ({ user, hasFollowBtn = false }) => (
    <div className="card shadow mb-2 border-0">
        <Link className="text-reset text-decoration-none" to={`/user/${user._id}`}>
            <div className="card-img-top cus-card-img-top">
                <img src={IMG + user.avatar}
                    className="cus-card-img"
                    alt={user.firstname + ' ' + user.lastname} />
            </div>
        </Link>

        <div className="card-body border-top border-secondary">
            <small className="card-subtitle">
                <div className="position-relative d-inline-block me-1">
                    {user.role == 'user' ? (
                        <span className='badge bg-primary cus-tooltip'>
                            <i className="fas fa-user"></i>
                        </span>
                    ) : (
                        <span className='badge bg-info cus-tooltip'>
                            <i className="fas fa-user-tie"></i>
                        </span>
                    )}
                    <small className="cus-tooltip-msg">{user.role}</small>
                </div>

                <UserLevel userId={user._id} />

                <div className="position-relative d-inline-block ms-1">
                    <span className='badge bg-pink cus-tooltip'>
                        <i className="fas fa-heart me-1"></i>{user.number_of_followers || '0'}
                    </span>
                    <small className='cus-tooltip-msg'>followers</small>
                </div>
            </small>

            <Link className="text-reset text-decoration-none link-hover" to={`/user/${user._id}`}>
                <h6 className="card-title text-nowrap mt-2">
                    {user.firstname + ' ' + user.lastname}
                </h6>
            </Link>

            {hasFollowBtn &&
                <div className="position-relative">
                    <div className="temp cus-tooltip">
                        <button
                            disabled
                            type="button"
                            className="btn btn-outline-pink ripple w-100 mt-1"
                        >
                            {/*Following */}
                            Follow
                        </button>
                    </div>
                    <small className="cus-tooltip-msg">This function is not available yet</small>
                </div>}
        </div>
    </div>
);

export default UserCard;