import { useState, useEffect } from 'react';
import { getUserLevel } from '../../../apis/user';

const shields = {
    "bronze": "#CD7F32",
    "silver": "#C0C0C0",
    "gold": "#FFD700",
    "diamond": "#82aeb3",
}

const UserLevel = ({ userId, details = false }) => {
    const [userLv, setUserLv] = useState({});

    const getUserLv = () => {
        getUserLevel(userId)
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
            });
    }

    useEffect(() => {
        getUserLv();
    }, [userId]);

    return (
        <div className="position-relative d-inline-block">
            <span className='badge cus-tooltip' style={{ backgroundColor: shields[userLv.name] }}>
                <i className={`fas fa-shield-alt ${details ? 'me-2' : ''}`}></i>
                {details && userLv.name}
            </span>

            {!details ? (
                <small className='cus-tooltip-msg'>{userLv.name || '-'}</small>
            ) : (
                <small className='cus-tooltip-msg'>
                    Floor point: {userLv.minPoint} - Discount: {userLv.discount &&
                        (userLv.discount.$numberDecimal * 100).toFixed(2)}%
                </small>
            )}

        </div>
    );
}

export default UserLevel;