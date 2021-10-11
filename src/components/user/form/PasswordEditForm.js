import { useState } from 'react';
import { getToken } from '../../../apis/auth';
import { updatePassword } from '../../../apis/user';
import useRegex from '../../../hooks/useRegex';
import Input from '../../ui/Input';
import Loading from '../../ui/Loading';
import Error from '../../ui/Error';
import Success from '../../ui/Success';
import ConfirmDialog from '../../ui/ConfirmDialog';

const PasswordEditForm = (props) => {
    const [account, setAccount] = useState({
        currentPassword: '',
        newPassword: '',
        isValidCurrentPassword: true,
        isValidNewPassword: true,
    });
    const [isloading, setIsLoading] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [regexTest] = useRegex();

    const handleChange = (e, name) => {
        switch (name) {
            case 'currentPassword': {
                setAccount({
                    ...account,
                    currentPassword: e.target.value,
                    isValidCurrentPassword: true,
                });
                return;
            }
            case 'newPassword': {
                setAccount({
                    ...account,
                    newPassword: e.target.value,
                    isValidNewPassword: true,
                });
                return;
            }
        }
    }

    const handleValidate = (name) => {
        switch (name) {
            case 'currentPassword': {
                setAccount({
                    ...account,
                    isValidCurrentPassword: regexTest('passwordLess', account.currentPassword),
                });
                return;
            }
            case 'newPassword': {
                setAccount({
                    ...account,
                    isValidNewPassword: regexTest('password', account.newPassword),
                });
                return;
            }
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!account.currentPassword || !account.newPassword) {
            setAccount({
                ...account,
                isValidCurrentPassword: regexTest('passwordLess', account.currentPassword),
                isValidNewPassword: regexTest('password', account.newPassword),
            });
            return;
        }

        if (!account.isValidCurrentPassword ||
            !account.isValidCurrentPassword) {
            return;
        }
        else {
            setIsConfirming(true);
        }

    }

    const onSubmit = () => {
        const user = { currentPassword: account.currentPassword, newPassword: account.newPassword }
        const { _id, accessToken } = getToken();

        setError('');
        setSuccess('');
        setIsLoading(true);
        updatePassword(_id, accessToken, user)
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
        <div className="password-edit-form-wrap position-relative">
            {isloading && <Loading />}

            {isConfirming && <ConfirmDialog
                title='Change password'
                onSubmit={onSubmit}
                onClose={() => setIsConfirming(false)}
            />}

            <form className="password-edit-form row mb-2" onSubmit={handleSubmit}>

                <div className="col-12">
                    <Input
                        type="password"
                        label="Current password"
                        value={account.currentPassword}
                        isValid={account.isValidCurrentPassword}
                        feedback="Please provide a valid password."
                        onChange={(e) => handleChange(e, 'currentPassword')}
                        onBlur={() => handleValidate('currentPassword')}
                    />
                </div>

                <div className="col-12">
                    <Input
                        type="password"
                        label="New password"
                        value={account.newPassword}
                        isValid={account.isValidNewPassword}
                        feedback="Password must contain at least 6 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character such as @, $, !, %, *, ?, &."
                        onChange={(e) => handleChange(e, 'newPassword')}
                        onBlur={() => handleValidate('newPassword')}
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

export default PasswordEditForm;