import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getToken } from '../../../apis/auth';
import { removeStaff } from '../../../apis/store';
import { addVendor } from '../../../actions/vendor';
import UserLevel from '../../user/item/UserLevel';
import Error from '../../ui/Error';
import Loading from '../../ui/Loading';
import ConfirmDialog from '../../ui/ConfirmDialog';

const IMG = process.env.REACT_APP_STATIC_URL;

const StaffCard = ({ user = {}, storeId = '', hasRemoveBtn = false }) => {
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
        removeStaff(_id, accessToken, staff, storeId)
            .then(data => {
                if (data.error) {
                    setIsLoading(false);
                    setError(data.error);
                    setTimeout(() => {
                        setError('');
                    }, 3000);
                }
                else {
                    dispatch(addVendor(data.store));
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
            >
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

                <Link className="text-reset text-decoration-none link-hover"
                    to={`/user/${user._id}`}
                >
                    <h6 className="card-title text-nowrap mt-2">
                        {user.firstname + ' ' + user.lastname}
                    </h6>
                </Link>

                {hasRemoveBtn && (
                    <button type="button" className="btn btn-outline-danger w-100 mt-1"
                        onClick={handleRemoveStaff}>
                        Remove staff
                    </button>
                )}
            </div>
        </div>
    );
}

export default StaffCard;