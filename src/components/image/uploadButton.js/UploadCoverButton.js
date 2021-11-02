import { useState, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { getToken } from '../../../apis/auth';
import { updateCover } from '../../../apis/user';
import { addAccount } from '../../../actions/account';
import Loading from '../../ui/Loading';
import Error from '../../ui/Error';

const UserCoverUpload = (props) => {
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const dispatch = useDispatch();

    const handleChange = (e) => {
        if (e.target.files[0] == null) return;

        const { _id, accessToken } = getToken();
        const formData = new FormData();
        formData.set('photo', e.target.files[0]);

        setError('');
        setIsLoading(true);
        updateCover(_id, accessToken, formData)
            .then(data => {
                if (data.error) {
                    setError(data.error);
                    setTimeout(() => {
                        setError('');
                    }, 3000);
                }
                else {
                    dispatch(addAccount(data.user));
                }
                setIsLoading(false);
            })
            .catch(error => {
                setError('Server Error');
                setIsLoading(false);
                setTimeout(() => {
                    setError('');
                }, 3000);
            });
    }

    return (
        <Fragment>
            {isloading && <Loading />}
            <label className="cus-cover-icon">
                <i className="fas fa-camera me-2"></i>
                <span>Edit Cover Photo</span>
                {error && <Error msg={error} />}
                <input className="visually-hidden" type="file"
                    accept="image/png, image/jpeg, image/jpg, image/gif"
                    onChange={handleChange}
                />
            </label>
        </Fragment>
    );
}

export default UserCoverUpload;