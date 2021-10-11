import { useState, useEffect } from 'react';
import { getUserLevel } from '../../apis/user';
import Input from "./Input";
import Loading from './Loading';
import Error from './Error';

const shields = {
    "bronze": "#CD7F32",
    "silver": "#C0C0C0",
    "gold": "#FFD700",
    "diamond": "#82aeb3",
}

const AmountOrderVisit = ({ userId, point, number_of_successful_orders, number_of_failed_orders }) => {
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
                <Input
                    type="text"
                    label="Point"
                    value={point}
                    isDisabled={true}
                />
            </div>

            <div className="col-6 mt-2">
                {isloading && <Loading size="small" />}
                <div className="position-relative d-inline-block">
                    <span className='badge cus-tooltip' style={{ backgroundColor: shields[userLv.name] }}>
                        <i className="fas fa-shield-alt me-2"></i>
                        {!userLv.name && error && <Error msg={error} />}
                        {userLv.name}
                    </span>
                    <small className='cus-tooltip-msg'>
                        Floor point: {userLv.minPoint} - Discount: {userLv.discount && userLv.discount.$numberDecimal * 100}%
                    </small>
                </div>
            </div>

            <div className="col-12">
                <Input
                    type="text"
                    label="Sucessful / failed orders"
                    value={number_of_successful_orders + ' / ' + number_of_failed_orders}
                    isDisabled={true}
                />
            </div>
        </div>
    )
}

export default AmountOrderVisit;