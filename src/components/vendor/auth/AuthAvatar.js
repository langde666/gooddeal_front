import { useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { getToken } from '../../../apis/auth';
import { updateAvatar } from '../../../apis/store';
import { addStore } from '../../../actions/store';
import Loading from '../../ui/Loading';
import Error from '../../ui/Error';
const IMG = process.env.REACT_APP_STATIC_URL;

const AuthAvatar = ({ isEditable = false, withVendor = true, bodername = false, store, actions }) => {
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const { avatar: userAvt, firstname, lastname } = useSelector(state => state.user.user);
    const { _id: storeId, avatar, name, rating } = store;

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
                        <label htmlFor='uploadAuthAvatar' className="cus-avatar-icon">
                            <i className="fas fa-camera"></i>
                            {error && <span><Error msg={error} /></span>}
                            <input id='uploadAuthAvatar' className="visually-hidden" type="file"
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

            <h1 className={`mt-2 px-2 py-1 d-inline-flex align-items-center rounded fs-5 ${bodername ? 'bg-light shadow' : ''}`}>{name}</h1>
        </div>
    );
}

const mapStateToProps = (state) => {
    return { store: state.store.store }
}

const mapDispatchToProps = (dispatch) => {
    return { actions: (data) => dispatch(addStore(data.store)) }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthAvatar);