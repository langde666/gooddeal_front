import { useState, useEffect } from 'react';
import { getUserLevel } from '../../../apis/user';
import Paragraph from "../../ui/Paragraph";
import Loading from '../../ui/Loading';
import Error from '../../ui/Error';

const shields = {
    "bronze": "#CD7F32",
    "silver": "#C0C0C0",
    "gold": "#FFD700",
    "diamond": "#82aeb3",
}

const UserLevelGroup = ({ userId, point, number_of_successful_orders, number_of_failed_orders }) => {
    const [userLv, setUserLv] = useState({});
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const getUserLv = () => {
        setError('');
        setIsLoading(true);

        getUserLevel(userId)
            .then(data => {
                if (data.error) {
                    setError(data.error);
                    setIsLoading(false);
                }
                else {
                    setUserLv(data.level);
                    setIsLoading(false);
                }
            })
            .catch((error) => {
                setError('Server error');
                setIsLoading(false);
            })
    }

    useEffect(() => {
        getUserLv();
    }, [point, userId]);

    return (
        <div className="profile-form row py-2 border border-primary rounded-3">
            <div className="col-6">
                <Paragraph
                    label="Point"
                    value={point}
                />
            </div>

            <div className="col-6 mt-2">
                <div className="position-relative d-inline-block">
                    {isloading && <Loading size="small" />}
                    <span className='badge cus-tooltip' style={{ backgroundColor: shields[userLv.name] }}>
                        <i className="fas fa-shield-alt me-2"></i>
                        {!userLv.name && error && <Error msg={error} />}
                        {userLv.name}
                    </span>
                    <small className='cus-tooltip-msg'>
                        Floor point: {userLv.minPoint} - Discount: {userLv.discount
                            && (userLv.discount.$numberDecimal * 100).toFixed(2)}%
                    </small>
                </div>
            </div>

            <div className="col-12">
                <Paragraph
                    label="Sucessful / failed orders"
                    value={number_of_successful_orders + ' / ' + number_of_failed_orders}
                />
            </div>
        </div>
    )
}

export default UserLevelGroup;