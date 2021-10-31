import { useState } from 'react';
import { connect } from 'react-redux';
import { getToken } from '../../../apis/auth';
import { updateAvatar } from '../../../apis/user';
import { addAccount } from '../../../actions/account';
import Loading from '../../ui/Loading';
import Error from '../../ui/Error';
const IMG = process.env.REACT_APP_STATIC_URL;

const AuthAvatar = ({ isEditable = false, bodername = false, user, actions }) => {
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const { avatar, firstname, lastname } = user;

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
                </div>
            </div>

            <h1 className={`mt-2 px-2 py-1 rounded d-inline-block fs-5 ${bodername ? 'bg-body shadow' : ''}`}> {firstname && lastname && firstname + ' ' + lastname}</h1>
        </div>
    )
}

const mapStateToProps = (state) => {
    return { user: state.account.user }
}

const mapDispatchToProps = (dispatch) => {
    return { actions: (data) => dispatch(addAccount(data.user)) }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthAvatar);