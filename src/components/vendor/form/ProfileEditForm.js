import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addStore } from '../../../actions/store';
import { getToken } from '../../../apis/auth';
import { updateProfile } from '../../../apis/store';
import useRegex from '../../../hooks/useRegex';
import Input from '../../ui/Input';
import TextArea from '../../ui/TextArea';
import Loading from '../../ui/Loading';
import Error from '../../ui/Error';
import Success from '../../ui/Success';
import ConfirmDialog from '../../ui/ConfirmDialog';

const ProfileEditForm = ({ name, bio, storeId }) => {
    const [isloading, setIsLoading] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [profile, setProfile] = useState({});

    const [regexTest] = useRegex();
    const dispatch = useDispatch();

    useEffect(() => {
        setProfile({
            name: name,
            bio: bio,
            isValidName: true,
            isValidBio: true,
        })
    }, [name, bio, storeId])

    const handleChange = (e, name) => {
        switch (name) {
            case 'name': {
                setProfile({
                    ...profile,
                    name: e.target.value,
                    isValidName: true,
                });
                return;
            }
            case 'bio': {
                setProfile({
                    ...profile,
                    bio: e.target.value,
                    isValidBio: true,
                });
                return;
            }
        }
    }

    const handleValidate = (name) => {
        switch (name) {
            case 'name': {
                setProfile({
                    ...profile,
                    isValidName: regexTest('name', profile.name),
                });
                return;
            }
            case 'bio': {
                setProfile({
                    ...profile,
                    isValidBio: regexTest('bio', profile.bio),
                });
                return;
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!profile.isValidName || !profile.isValidBio) {
            return;
        }
        else {
            setIsConfirming(true);
        }

    }

    const onSubmit = () => {
        let store = { name: profile.name, bio: profile.bio };
        const { _id, accessToken } = getToken();

        setError('');
        setSuccess('');
        setIsLoading(true);
        updateProfile(_id, accessToken, store, storeId)
            .then(data => {
                if (data.error) {
                    setError(data.error);
                    setIsLoading(false);
                    setTimeout(() => {
                        setError('');
                    }, 3000);
                }
                else {
                    setSuccess(data.success);
                    dispatch(addStore(data.store));
                    setIsLoading(false);
                    setTimeout(() => {
                        setSuccess('');
                    }, 3000);
                }
            })
            .catch(error => {
                setError('Server error');
                setIsLoading(false);
                setTimeout(() => {
                    setError('');
                }, 3000);
            });
    }

    return (
        <div className="shop-profile-edit-form-wrap position-relative">
            {isloading && <Loading />}

            {isConfirming && <ConfirmDialog
                title='Edit shop profile'
                onSubmit={onSubmit}
                onClose={() => setIsConfirming(false)}
            />}

            <form className="shop-profile-edit-form row mb-2" onSubmit={handleSubmit}>
                <div className="col-12">
                    <Input
                        type="text"
                        label="Shop name"
                        value={profile.name}
                        isValid={profile.isValidName}
                        feedback="Please provide a valid shop name."
                        onChange={(e) => handleChange(e, 'name')}
                        onBlur={() => handleValidate('name')}
                    />
                </div>

                <div className="col-12">
                    <TextArea
                        type="text"
                        label="Shop bio"
                        value={profile.bio}
                        isValid={profile.isValidBio}
                        feedback="Please provide a valid shop bio."
                        onChange={(e) => handleChange(e, 'bio')}
                        onBlur={() => handleValidate('bio')}
                    />
                </div>

                {error && (
                    <div className="col-12">
                        <Error msg={error} />
                    </div>
                )}

                {success && (
                    <div className="col-12">
                        <Success msg={success} />
                    </div>
                )}

                <div className="col-12 d-grid mt-4">
                    <button type="submit" className="btn btn-primary ripple"
                        onClick={handleSubmit}>Save</button>
                </div>
            </form>
        </div>
    );
}

export default ProfileEditForm;