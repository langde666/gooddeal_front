import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getToken } from '../../../apis/auth';
import { updateCover } from '../../../apis/store';
import { addVendor } from '../../../actions/vendor';
import Loading from '../../ui/Loading';
import Error from '../../ui/Error';
const IMG = process.env.REACT_APP_STATIC_URL;

const AuthCover = (props) => {
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    let { _id: storeId, cover } = useSelector(state => state.vendor.store);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        if (e.target.files[0] == null) return;

        const { _id, accessToken } = getToken();
        const formData = new FormData();
        formData.set('photo', e.target.files[0]);
        setError('');
        setIsLoading(true);
        updateCover(_id, accessToken, formData, storeId)
            .then(data => {
                if (data.error) {
                    setError(data.error);
                    setTimeout(() => {
                        setError('');
                    }, 3000);
                }
                else {
                    dispatch(addVendor(data.store));
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
        <div className='cus-cover-wrap'>
            <div className="cus-cover">
                {isloading && <Loading />}
                <img src={`${IMG + cover}`}
                    className='cus-cover-img' alt="cover" />
                {cover && (
                    <label className="cus-cover-icon">
                        <i className="fas fa-camera me-2"></i>
                        <span>Edit Cover Photo</span>
                        {error && <Error msg={error} />}
                        <input className="visually-hidden" type="file"
                            accept="image/png, image/jpeg, image/jpg, image/gif"
                            onChange={handleChange}
                        />
                    </label>
                )}
            </div>
        </div>
    );
}

export default AuthCover;