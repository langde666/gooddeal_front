import { useState } from 'react';
import { getToken } from '../../../apis/auth';
import { openStore } from '../../../apis/store';
import Loading from '../../ui/Loading';
import Error from '../../ui/Error';

const OpenShopButton = ({ storeId = '', isOpen = true, className = '', hasIcon = true, onRun = () => { } }) => {
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const { _id, accessToken } = getToken();

    const handleOpenStore = () => {
        setError('');
        setIsLoading(true);
        const value = { isOpen: !isOpen };
        openStore(_id, accessToken, value, storeId)
            .then(data => {
                if (data.error) {
                    setError(data.error);
                    setIsLoading(false);
                    setTimeout(() => {
                        setError('');
                    }, 3000);
                }
                else {
                    setIsLoading(false);
                    onRun();
                }
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
        <button
            type="button"
            className={`btn ${isOpen ? 'btn-outline-primary' : 'btn-outline-danger'} ripple ${className}`}
            onClick={handleOpenStore}
        >
            {isLoading && <Loading />}
            {error ? (
                <Error msg={error} />
            ) : (
                isOpen ? (
                    <span>
                        {hasIcon && <i className="fas fa-door-open me-2"></i>}Open
                    </span>
                ) : (
                    <span>
                        {hasIcon && <i className="fas fa-door-closed me-2"></i>}Closed
                    </span>))}
        </button>
    );
}
export default OpenShopButton;