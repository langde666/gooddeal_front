import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUserLevel } from '../../../apis/user';

const IMG = process.env.REACT_APP_STATIC_URL;
const shields = {
    "bronze": "#CD7F32",
    "silver": "#C0C0C0",
    "gold": "#FFD700",
    "diamond": "#82aeb3",
}

const UserCard = ({ user }) => {
    const [userLv, setUserLv] = useState({});

    const getUserLv = () => {

        getUserLevel(user._id)
            .then(data => {
                if (data.error) {
                    return;
                }
                else {
                    setUserLv(data.level);
                }
            })
            .catch((error) => {
                return;
            })
    }

    useEffect(() => {
        getUserLv();
    }, [user]);

    return (
        <Link className="card text-reset text-decoration-none shadow mb-2 border-0"
            to={`/user/${user._id}`}
        >
            <div className="card-img-top cus-card-img-top">
                <img src={IMG + user.avatar}
                    className="cus-card-img"
                    alt={user.firstname + ' ' + user.lastname}
                    style={{ width: '100%' }} />
            </div>


            <div className="card-body">
                <h6 className="card-title text-nowrap">
                    {user.firstname + ' ' + user.lastname}
                </h6>

                <small className="card-subtitle mb-1">
                    <div className="position-relative d-inline-block">
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

                    <div className="position-relative d-inline-block">
                        <span className='badge cus-tooltip ms-1' style={{ backgroundColor: shields[userLv.name] }}>
                            <i className="fas fa-shield-alt"></i>
                        </span>
                        <small className='cus-tooltip-msg'>
                            {userLv.name || '-'}
                        </small>
                    </div>
                </small>

                <button className="btn btn-outline-primary w-100 mt-2 ripple">View Profile</button>
            </div>
        </Link>
    )
}

export default UserCard;