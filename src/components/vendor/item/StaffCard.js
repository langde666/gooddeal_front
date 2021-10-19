import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getToken } from '../../../apis/auth';
import { removeStaffes } from '../../../apis/store';
import { addStore } from '../../../actions/store';
import UserLevel from '../../user/item/UserLevel';
import Error from '../../ui/Error';
import Loading from '../../ui/Loading';
import Success from '../../ui/Success';
import ConfirmDialog from '../../ui/ConfirmDialog';

const IMG = process.env.REACT_APP_STATIC_URL;

const StaffCard = ({ user, storeId, hasRemoveBtn = false }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);
    const [error, setError] = useState('');
    const { _id, accessToken } = getToken();
    const dispatch = useDispatch();

    const handleRemoveStaff = () => {
        setIsConfirming(true);
    }

    const onRemoveSubmit = () => {
        const staff = user._id;
        setError('');
        setIsLoading(true);
        removeStaffes(_id, accessToken, staff, storeId)
            .then(data => {
                if (data.error) {
                    setIsLoading(false);
                    setError(data.error);
                    setTimeout(() => {
                        setError('');
                    }, 3000);
                }
                else {
                    dispatch(addStore(data.store));
                    setIsLoading(false);
                }
            })
            .catch(error => {
                setError('Server Error');
                setTimeout(() => {
                    setError('');
                }, 3000);
            });
    }

    return (
        <div className="card shadow mb-2 border-0 positon-relative">
            {isLoading && <Loading />}
            {error && <Error msg={error} />}
            {isConfirming && <ConfirmDialog
                title='Remove staff'
                color='danger'
                message={'Remove ' + user.firstname + ' ' + user.lastname}
                onSubmit={onRemoveSubmit}
                onClose={() => setIsConfirming(false)}
            />}
            <Link className="text-reset text-decoration-none"
                to={`/user/${user._id}`}
                target="_blank">
                <div className="card-img-top cus-card-img-top">
                    <img src={IMG + user.avatar}
                        className="cus-card-img"
                        alt={user.firstname + ' ' + user.lastname} />
                </div>
            </Link>


            <div className="card-body border-top border-secondary">
                <small className="card-subtitle">
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

                    <UserLevel userId={user._id} />

                    <div className="position-relative d-inline-block ms-1">
                        <span className='badge bg-pink cus-tooltip'>
                            <i className="fas fa-heart me-1"></i>{user.number_of_followers || '0'}
                        </span>
                        <small className='cus-tooltip-msg'>followers</small>
                    </div>
                </small>

                <Link className="text-reset text-decoration-none link-hover"
                    to={`/user/${user._id}`}
                    target="_blank">
                    <h6 className="card-title text-nowrap mt-2">
                        {user.firstname + ' ' + user.lastname}
                    </h6>
                </Link>

                {hasRemoveBtn && (
                    <div className="position-relative mt-3">
                        <button type="button" className="btn btn-outline-danger w-100 cus-tooltip"
                            onMouseDown={handleRemoveStaff}>
                            <i className="fas fa-ban"></i>
                        </button>
                        <small className="cus-tooltip-msg">Remove staff</small>
                    </div>
                )}
            </div>
        </div>
    );
}

export default StaffCard;