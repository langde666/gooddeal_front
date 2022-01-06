import { useState } from 'react';
import { getToken } from '../../../apis/auth';
import useUpdateDispatch from '../../../hooks/useUpdateDispatch';
import { createTransactionByUser } from '../../../apis/transaction';
import { regexTest, numberTest } from '../../../helper/test';
import Input from '../../ui/Input';
import Loading from '../../ui/Loading';
import Error from '../../ui/Error';
import Success from '../../ui/Success';
import ConfirmDialog from '../../ui/ConfirmDialog';

const CreateTransactionFormForUser = ({ eWallet = 0, onRun }) => {
    const [isloading, setIsLoading] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [updateDispatch] = useUpdateDispatch();

    const { _id: userId, accessToken } = getToken();

    const [transaction, setTransaction] = useState({
        isUp: 'false',
        amount: 50000,
        currentPassword: '',
        isValidAmount: true,
        isValidCurrentPassword: true,
    });

    const handleChange = (name, isValidName, value) => {
        setTransaction({
            ...transaction,
            [name]: value,
            [isValidName]: true,
        });
    };

    const handleValidate = (isValidName, flag) => {
        if (isValidName === 'isValidAmount') {
            setTransaction({
                ...transaction,
                isValidAmount:
                    flag &&
                    parseFloat(transaction.amount) <= parseFloat(eWallet),
            });
        } else
            setTransaction({
                ...transaction,
                [isValidName]: flag,
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { amount, currentPassword } = transaction;

        if (!userId || !amount || !currentPassword) {
            setTransaction({
                ...transaction,
                isValidAmount:
                    numberTest('positive', amount) &&
                    parseFloat(transaction.amount) <= parseFloat(eWallet),
                isValidCurrentPassword: regexTest('password', currentPassword),
            });
            return;
        }

        if (!transaction.isValidAmount || !transaction.isValidCurrentPassword)
            return;

        setIsConfirming(true);
    };

    const onSubmit = () => {
        setError('');
        setSuccess('');
        setIsLoading(true);

        // console.log('onSubmit', transaction);

        createTransactionByUser(userId, accessToken, transaction)
            .then((data) => {
                if (data.error) {
                    setError(data.error);
                    setIsLoading(false);
                    setTimeout(() => {
                        setError('');
                    }, 3000);
                } else {
                    setTransaction({
                        ...transaction,
                        amount: 50000,
                        currentPassword: '',
                        isValidAmount: true,
                        isValidCurrentPassword: true,
                    });

                    updateDispatch('account', data.user);
                    setSuccess('Withdraw successfully!');
                    setIsLoading(false);
                    setTimeout(() => {
                        setSuccess('');
                    }, 3000);

                    if (onRun) onRun();
                }
            })
            .catch((error) => {
                setError('Server error');
                setIsLoading(false);
                setTimeout(() => {
                    setError('');
                }, 3000);
            });
    };

    return (
        <div className="position-relative">
            {isloading && <Loading />}

            {isConfirming && (
                <ConfirmDialog
                    title="Create transaction"
                    onSubmit={onSubmit}
                    onClose={() => setIsConfirming(false)}
                />
            )}

            <form className="row mb-2" onSubmit={handleSubmit}>
                <div className="col-12">
                    <Input
                        type="number"
                        label="Amount"
                        value={transaction.amount}
                        isValid={transaction.isValidAmount}
                        feedback="Please provide a valid amount."
                        validator="positive"
                        onChange={(value) =>
                            handleChange('amount', 'isValidAmount', value)
                        }
                        onValidate={(flag) =>
                            handleValidate('isValidAmount', flag)
                        }
                    />
                </div>

                <div className="col-12">
                    <Input
                        type="password"
                        label="Current password"
                        value={transaction.currentPassword}
                        isValid={transaction.isValidCurrentPassword}
                        feedback="Please provide a valid password."
                        validator="password"
                        onChange={(value) =>
                            handleChange(
                                'currentPassword',
                                'isValidCurrentPassword',
                                value,
                            )
                        }
                        onValidate={(flag) =>
                            handleValidate('isValidCurrentPassword', flag)
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

export default CreateTransactionFormForUser;