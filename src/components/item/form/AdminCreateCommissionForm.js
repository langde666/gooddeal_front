import { useState } from 'react';
import { getToken } from '../../../apis/auth';
import { createCommission } from '../../../apis/commission';
import { regexTest, numberTest } from '../../../helper/test';
import TextArea from '../../ui/TextArea';
import Input from '../../ui/Input';
import Loading from '../../ui/Loading';
import Error from '../../ui/Error';
import Success from '../../ui/Success';
import ConfirmDialog from '../../ui/ConfirmDialog';

const AdminCreateCommissionForm = ({ onRun = () => {} }) => {
    const [isloading, setIsLoading] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [commission, setCommission] = useState({
        name: '',
        description: '',
        cost: 0,
        isValidName: true,
        isValidDescription: true,
        isValidCost: true,
    });

    const handleChange = (name, isValidName, value) => {
        setCommission({
            ...commission,
            [name]: value,
            [isValidName]: true,
        });
    };

    const handleValidate = (isValidName, flag) => {
        setCommission({
            ...commission,
            [isValidName]: flag,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { name, description, cost } = commission;
        if (!name || !description || cost === '') {
            setCommission({
                ...commission,
                isValidName: regexTest('name', name),
                isValidDescription: regexTest('bio', description),
                isValidCost: numberTest('zeroTo100', cost),
            });
            return;
        }

        const { isValidName, isValidDescription, isValidCost } = commission;
        if (!isValidName || !isValidDescription || !isValidCost) return;

        setIsConfirming(true);
    };

    const onSubmit = () => {
        const { _id, accessToken } = getToken();

        setError('');
        setSuccess('');
        setIsLoading(true);
        createCommission(_id, accessToken, commission)
            .then((data) => {
                if (data.error) {
                    setError(data.error);
                    setIsLoading(false);
                    setTimeout(() => {
                        setError('');
                    }, 3000);
                } else {
                    setSuccess(data.success);
                    setIsLoading(false);
                    setTimeout(() => {
                        setSuccess('');
                    }, 3000);
                    setCommission({
                        name: '',
                        description: '',
                        cost: 0,
                        isValidName: true,
                        isValidDescription: true,
                        isValidCost: true,
                    });
                    if (onRun) onRun();
                }
            })
            .catch((error) => {
                setError('Sever error');
                setIsLoading(false);
                setTimeout(() => {
                    setError('');
                }, 3000);
            });
    };

    return (
        <div className="create-commission-form-wrap position-relative">
            {isloading && <Loading />}

            {isConfirming && (
                <ConfirmDialog
                    title="Create this commission"
                    onSubmit={onSubmit}
                    onClose={() => setIsConfirming(false)}
                />
            )}

            <form
                className="create-commission-form row mb-2"
                onSubmit={handleSubmit}
            >
                <div className="col-12">
                    <Input
                        type="text"
                        label="Commission name"
                        value={commission.name}
                        isValid={commission.isValidName}
                        feedback="Please provide a valid commission name."
                        validator="level"
                        onChange={(value) =>
                            handleChange('name', 'isValidName', value)
                        }
                        onValidate={(flag) =>
                            handleValidate('isValidName', flag)
                        }
                    />
                </div>

                <div className="col-12">
                    <TextArea
                        type="text"
                        label="Description"
                        value={commission.description}
                        isValid={commission.isValidDescription}
                        feedback="Please provide a valid commission description."
                        validator="bio"
                        onChange={(value) =>
                            handleChange(
                                'description',
                                'isValidDescription',
                                value,
                            )
                        }
                        onValidate={(flag) =>
                            handleValidate('isValidDescription', flag)
                        }
                    />
                </div>

                <div className="col-12">
                    <Input
                        type="number"
                        label="Cost (%)"
                        value={commission.cost}
                        isValid={commission.isValidCost}
                        feedback="Please provide a valid cost (>=0)."
                        validator="zeroTo100"
                        onChange={(value) =>
                            handleChange('cost', 'isValidCost', value)
                        }
                        onValidate={(flag) =>
                            handleValidate('isValidCost', flag)
                        }
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
                    <button
                        type="submit"
                        className="btn btn-primary ripple"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AdminCreateCommissionForm;
