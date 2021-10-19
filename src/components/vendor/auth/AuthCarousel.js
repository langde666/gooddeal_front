import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getToken } from '../../../apis/auth';
import { updateFeaturedImage, addFeaturedImage, removeFeaturedImage } from '../../../apis/store';
import { addStore } from '../../../actions/store';
import Loading from '../../ui/Loading';
import Error from '../../ui/Error';
import Success from '../../ui/Success';
import ConfirmDialog from '../../ui/ConfirmDialog';
const IMG = process.env.REACT_APP_STATIC_URL;

const AuthCarousel = (props) => {
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isConfirming, setIsConfirming] = useState(false);
    const [index, setIndex] = useState('');

    let { _id: storeId, featured_images } = useSelector(state => state.store.store);
    const { _id, accessToken } = getToken();
    const dispatch = useDispatch();

    const [listImages, setListImages] = useState(featured_images);

    useEffect(() => {
        console.log('render');
        setListImages(featured_images);
    }, [featured_images]);

    const handleUpdateFeaturedImage = (e, index) => {
        if (e.target.files[0] == null) return;
        const formData = new FormData();
        formData.set('photo', e.target.files[0]);

        setError('');
        setSuccess('');
        setIsLoading(true);
        updateFeaturedImage(_id, accessToken, formData, index, storeId)
            .then(data => {
                if (data.error) {
                    setError(data.error);
                    setTimeout(() => {
                        setError('');
                    }, 3000);
                }
                else {
                    dispatch(addStore(data.store));
                    setSuccess(data.success);
                    setTimeout(() => {
                        setSuccess('');
                    }, 3000);
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

    const handleAddFeaturedImage = (e) => {
        if (e.target.files[0] == null) return;
        const formData = new FormData();
        formData.set('photo', e.target.files[0]);

        setError('');
        setSuccess('');
        setIsLoading(true);
        addFeaturedImage(_id, accessToken, formData, storeId)
            .then(data => {
                if (data.error) {
                    setError(data.error);
                    setTimeout(() => {
                        setError('');
                    }, 3000);
                }
                else {
                    dispatch(addStore(data.store));
                    setSuccess(data.success);
                    setTimeout(() => {
                        setSuccess('');
                    }, 3000);
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

    const handleRemove = (index) => {
        setIndex(index);
        setIsConfirming(true);
    }

    const onRemoveSubmit = () => {
        setError('');
        setSuccess('');
        setIsLoading(true);
        removeFeaturedImage(_id, accessToken, index, storeId)
            .then(data => {
                if (data.error) {
                    setError(data.error);
                    setTimeout(() => {
                        setError('');
                    }, 3000);
                }
                else {
                    dispatch(addStore(data.store));

                    setSuccess(data.success);
                    setTimeout(() => {
                        setSuccess('');
                    }, 3000);
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
        <div className="auth-carousel-wrap position-relative">
            {isloading && <Loading />}
            {isConfirming && <ConfirmDialog
                title='Remove this featured photo'
                onSubmit={onRemoveSubmit}
                onClose={() => setIsConfirming(false)}
            />}
            <div id="authCarouselInterval" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    {listImages && listImages.map((image, index) => (
                        <button key={index} type="button" data-bs-target="#authCarouselInterval" data-bs-slide-to={index}></button>
                    ))}
                    <button key={listImages && listImages.length || 0} type="button" data-bs-target="#authCarouselInterval" data-bs-slide-to={listImages && listImages.length} className="active"></button>
                </div>
                <div className="carousel-inner rounded-3">
                    {listImages && listImages.map((image, index) => (
                        <div key={index} className='carousel-item' data-bs-interval="2000">
                            <div className="cus-carousel">
                                <img src={`${IMG + image}`} className="d-block w-100 cus-carousel-img" alt="featured photo" />
                                <div className="cus-carousel-icon-wrap">
                                    <label htmlFor={`uploadFeaturedImage-${index}`} className="cus-carousel-icon me-2">
                                        <i className="fas fa-camera"></i>
                                        <span>Edit</span>
                                        <input id={`uploadFeaturedImage-${index}`}
                                            className="visually-hidden"
                                            type="file"
                                            accept="image/png, image/jpeg, image/jpg, image/gif"
                                            onChange={(e) => handleUpdateFeaturedImage(e, index)}
                                        />
                                    </label>

                                    <label
                                        className="cus-carousel-icon cus-carousel-icon--rm"
                                        onClick={() => handleRemove(index)}
                                    >
                                        <i className="fas fa-trash-alt"></i>
                                        <span>Remove</span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div key={listImages && listImages.length || 0} className='carousel-item active' data-bs-interval="2000">
                        <div className="cus-carousel">
                            <label type="button"
                                htmlFor='uploadNewFeaturedImage'
                                className="btn btn-secondary d-block w-100 cus-carousel-img cus-tooltip d-flex justify-content-center align-items-center"
                            >
                                <i className="fas fa-plus-circle me-2"></i>
                                <span className="me-2">Add featured photos</span>
                                {listImages && listImages.length >= 6
                                    && <span className="text-danger fs-6">This limit is 6 featured photos</span>}
                                <input id='uploadNewFeaturedImage'
                                    className="visually-hidden"
                                    disabled={listImages && listImages.length >= 6 ? true : false}
                                    type="file"
                                    accept="image/png, image/jpeg, image/jpg, image/gif"
                                    onChange={handleAddFeaturedImage}
                                />
                            </label>
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#authCarouselInterval" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#authCarouselInterval" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

            {error && <div className="d-flex justify-content-end"><Error msg={error} /></div>}
            {success && <div className="d-flex justify-content-end"><Success msg={success} /></div>}
        </div>
    );
}

export default AuthCarousel;