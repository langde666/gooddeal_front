import { useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { getToken } from '../../../apis/auth';
import { updateAvatar } from '../../../apis/store';
import { addVendor } from '../../../actions/vendor';
import Loading from '../../ui/Loading';
import Error from '../../ui/Error';
const IMG = process.env.REACT_APP_STATIC_URL;

const AuthAvatar = ({ isEditable = false, withVendor = true, bodername = false, store, actions, hasVendor = false, hasisOpen = false }) => {
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const { avatar: userAvt, firstname, lastname } = useSelector(state => state.account.user);
    const { _id: storeId, avatar, name, ownerId, isActive, isOpen } = store;
    const { _id: userId } = getToken();

    const handleChange = (e) => {
        if (e.target.files[0] == null) return;

        const { _id, accessToken } = getToken();
        const formData = new FormData();
        formData.set('photo', e.target.files[0]);
        setError('');
        setIsLoading(true);
        updateAvatar(_id, accessToken, formData, storeId)
            .then(data => {
                if (data.error) {
                    setError(data.error);
                    setTimeout(() => {
                        setError('');
                    }, 3000);
                }
                else {
                    actions(data);
                }
                setIsLoading(false);
            })
            .catch(error => {
                setError('Server Error');
                setIsLoading(false);
                setTimeout(() => {
                    setError('');
                }, 3000);
            })
    }

    return (
        <div className="cus-avatar-wrap">
            <div className="cus-avatar-box">
                <div className="cus-avatar">
                    {isloading && <Loading />}
                    <img src={`${IMG + avatar}`} className="cus-avatar-img" alt="avatar" />
                    {avatar && isEditable && (
                        <label className="cus-avatar-icon">
                            <i className="fas fa-camera"></i>
                            {error && <span><Error msg={error} /></span>}
                            <input className="visually-hidden" type="file"
                                accept="image/png, image/jpeg, image/jpg, image/gif"
                                onChange={handleChange}
                            />
                        </label>
                    )}
                    {userAvt && withVendor && (
                        <div className="cus-avatar-vendor-box">
                            <div className="cus-avatar-vendor cus-tooltip">
                                <img src={`${IMG + userAvt}`} className="cus-avatar-vendor-img" alt="avatar" />
                            </div>
                            <small className="cus-tooltip-msg">Manager: {firstname + ' ' + lastname}</small>
                        </div>
                    )}
                </div>
            </div>

            <h1 className={`mt-2 px-2 py-1 d-inline-flex justify-content-center align-items-center rounded fs-5 ${bodername ? 'bg-body shadow' : ''}`}>
                {name}
                {hasVendor && <small className="ms-2">
                    {ownerId && userId == ownerId._id ? (
                        <div className="d-inline-block position-relative">
                            <span className="badge bg-info cus-tooltip">
                                <i className="fas fa-user-shield"></i>
                            </span>
                            <small className="cus-tooltip-msg">owner</small>
                        </div>
                    ) : (
                        <div className="d-inline-block position-relative">
                            <span className="badge bg-primary cus-tooltip">
                                <i className="fas fa-user-friends"></i>
                            </span>
                            <small className="cus-tooltip-msg">staff</small>
                        </div>
                    )}

                    {isActive ? (
                        <div className="d-inline-block position-relative ms-1">
                            <span className="badge bg-info cus-tooltip">
                                <i className="fas fa-check-circle"></i>
                            </span>
                            <small className="cus-tooltip-msg">Licensed shop</small>
                        </div>
                    ) : (
                        <div className="d-inline-block position-relative">
                            <span className="badge bg-danger cus-tooltip">
                                <i className="fas fa-times-circle"></i>
                            </span>
                            <small className="cus-tooltip-msg">Unlicensed, keep perfecting your shop to get licensed by GoodDeal!</small>
                        </div>
                    )}
                </small>}
                {hasisOpen &&
                    <small className="ms-2">
                        <div className="d-inline-block position-relative">
                            <span className={`badge ${isOpen ? 'bg-info' : 'bg-danger'} cus-tooltip`}>
                                {isOpen ? (
                                    <span><i className="fas fa-door-open me-1"></i>open</span>
                                ) : (
                                    <span><i className="fas fa-door-closed me-1"></i>closed</span>
                                )}
                            </span>
                            <small className="cus-tooltip-msg">
                                {isOpen ?
                                    'This store is open, can order in this time.' :
                                    'This store is closed, can\'t order in this time'}
                            </small>
                        </div>
                    </small>}
            </h1>
        </div>
    );
}

const mapStateToProps = (state) => {
    return { store: state.vendor.store }
}

const mapDispatchToProps = (dispatch) => {
    return { actions: (data) => dispatch(addVendor(data.store)) }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthAvatar);