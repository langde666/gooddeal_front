import { useState } from 'react';
import { useDispatch, useSelector, connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as actionCreators from '../../../actions/user';
import { getToken } from '../../../apis/auth';
import { updateAvatar } from '../../../apis/user';
import { updateAvatar as dispatchAvt } from '../../../actions/user';
import Loading from '../../ui/Loading';
import Error from '../../ui/Error';
const IMG = process.env.REACT_APP_STATIC_URL;

const AuthAvatar = ({ isEditable = false }) => {
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    let { avatar, firstname, lastname } = useSelector(state => state.user.user);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        if (e.target.files[0] == null) return;

        const { _id, accessToken } = getToken();
        const formData = new FormData();
        formData.set('photo', e.target.files[0]);
        setError('');
        setIsLoading(true);
        updateAvatar(_id, accessToken, formData)
            .then(data => {
                if (data.error) {
                    setError(data.error);
                    setTimeout(() => {
                        setError('');
                    }, 3000);
                }
                else {
                    dispatch(dispatchAvt(data.avatar));
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
                </div>
            </div>

            <h1 className="mt-2 fs-4">{firstname && lastname && firstname + ' ' + lastname}</h1>
        </div>
    )
}

function mapStateToProps(state) {
    return { user: state.user }
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actionCreators, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthAvatar);