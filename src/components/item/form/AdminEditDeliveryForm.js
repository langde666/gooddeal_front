import { useState, useEffect } from 'react';
import { getToken } from '../../../apis/auth';
import { updateDelivery } from '../../../apis/delivery';
import { regexTest, numberTest } from '../../../helper/test';
import TextArea from '../../ui/TextArea';
import Input from '../../ui/Input';
import Loading from '../../ui/Loading';
import Error from '../../ui/Error';
import Success from '../../ui/Success';
import ConfirmDialog from '../../ui/ConfirmDialog';

const AdminEditDeliveryForm = ({ oldDelivery = '', onRun = () => {} }) => {
    const [isloading, setIsLoading] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [delivery, setDelivery] = useState({});

    useEffect(() => {
        setDelivery({
            name: oldDelivery.name,
            description: oldDelivery.description,
            price: oldDelivery.price && oldDelivery.price.$numberDecimal,
            isValidName: true,
            isValidDescription: true,
            isValidPrice: true,
        });
    }, [oldDelivery]);

    const handleChange = (name, isValidName, value) => {
        setDelivery({
            ...delivery,
            [name]: value,
            [isValidName]: true,
        });
    };

    const handleValidate = (isValidName, flag) => {
        setDelivery({
            ...delivery,
            [isValidName]: flag,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const { name, description, price } = delivery;
        if (!name || !description || !price) {
            setDelivery({
                ...delivery,
                isValidName: regexTest('name', name),
                isValidDescription: regexTest('bio', description),
                isValidPrice: numberTest('positive', price),
            });
            return;
        }

        const { isValidName, isValidDescription, isValidPrice } = delivery;
        if (!isValidName || !isValidDescription || !isValidPrice) return;

        setIsConfirming(true);
    };

    const onSubmit = () => {
        const { _id, accessToken } = getToken();

        console.log(delivery);

        setError('');
        setSuccess('');
        setIsLoading(true);
        updateDelivery(_id, accessToken, oldDelivery._id, delivery)
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
        <div className="edit-delivery-form-wrap position-relative">
            {isloading && <Loading />}

            {isConfirming && (
                <ConfirmDialog
                    title="Edit this delivery"
                    onSubmit={onSubmit}
                    onClose={() => setIsConfirming(false)}
                />
            )}

            <form
                className="edit-delivery-form row mb-2"
                onSubmit={handleSubmit}
            >
                <div className="col-12">
                    <Input
                        type="text"
                        label="Delivery unit name"
                        value={delivery.name}
                        isValid={delivery.isValidName}
                        feedback="Please provide a valid delivery name."
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
                        value={delivery.description}
                        isValid={delivery.isValidDescription}
                        feedback="Please provide a valid delivery description."
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
                        label="Price (VND)"
                        value={delivery.price}
                        isValid={delivery.isValidPrice}
                        feedback="Please provide a valid price (>0)."
                        validator="positive"
                        onChange={(value) =>
                            handleChange('price', 'isValidPrice', value)
                        }
                        onValidate={(flag) =>
                            handleValidate('isValidPrice', flag)
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

export default AdminEditDeliveryForm;
