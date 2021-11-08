import { useState, useEffect } from 'react';
import { getToken } from '../../apis/auth';
import { activeStore } from '../../apis/store';
import Loading from '../ui/Loading';
import Error from '../ui/Error';
import ConfirmDialog from '../ui/ConfirmDialog';

const ActiveInactiveStoreButton = ({
    storeId = '',
    isActive = true,
    className = '',
    onRun,
}) => {
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);
    const [activeFlag, setActiveFlag] = useState(isActive);

    const { _id, accessToken } = getToken();

    useEffect(() => {
        setActiveFlag(isActive);
    }, [isActive, storeId]);

    const handleActiveStore = () => {
        setIsConfirming(true);
    };

    const onSubmit = () => {
        setError('');
        setIsLoading(true);
        const value = { isActive: !activeFlag };
        activeStore(_id, accessToken, value, storeId)
            .then((data) => {
                if (data.error) {
                    setError(data.error);
                    setIsLoading(false);
                    setTimeout(() => {
                        setError('');
                    }, 3000);
                } else {
                    setIsLoading(false);
                    setActiveFlag(!activeFlag);
                    if (onRun) onRun();
                }
            })
            .catch((error) => {
                setError('Server Error');
                setIsLoading(false);
                setTimeout(() => {
                    setError('');
                }, 3000);
            });
    };

    return (
        <div className="active-inactive-store-button-wrap position-relative">
            {isLoading && <Loading />}
            {error && <Error msg={error} />}
            {isConfirming && (
                <ConfirmDialog
                    title={!activeFlag ? "Liscense this shop" : "Ban this shop"}
                    color={!activeFlag ? "primary" : "danger"}
                    onSubmit={onSubmit}
                    onClose={() => setIsConfirming(false)}
                />
            )}
            <button
                type="button"
                className={`btn ${!activeFlag ? 'btn-outline-primary' : 'btn-outline-danger'
                    } ripple ${className}`}
                onClick={handleActiveStore}
            >

                {!activeFlag ? (
                    <i className="far fa-check-circle"></i>
                ) : (
                    <i className="fas fa-ban"></i>
                )}
            </button>
        </div>
    );
};

export default ActiveInactiveStoreButton;