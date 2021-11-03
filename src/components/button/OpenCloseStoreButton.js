import { useState, useEffect } from 'react';
import { getToken } from '../../apis/auth';
import { openStore } from '../../apis/store';
import Loading from '../ui/Loading';
import Error from '../ui/Error';

const OpenCloseStoreButton = ({
    storeId = '',
    isOpen = true,
    detail = true,
    className = '',
    onRun,
}) => {
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [openFlag, setOpenFlag] = useState(isOpen);

    const { _id, accessToken } = getToken();

    useEffect(() => {
        setOpenFlag(isOpen);
    }, [isOpen, storeId]);

    const handleOpenStore = () => {
        setError('');
        setIsLoading(true);
        const value = { isOpen: !openFlag };
        openStore(_id, accessToken, value, storeId)
            .then((data) => {
                if (data.error) {
                    setError(data.error);
                    setIsLoading(false);
                    setTimeout(() => {
                        setError('');
                    }, 3000);
                } else {
                    setIsLoading(false);
                    setOpenFlag(!openFlag);
                    if (onRun) onRun(data.store);
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
        <button
            type="button"
            className={`btn ${
                openFlag ? 'btn-outline-primary' : 'btn-outline-danger'
            } ripple ${className}`}
            onClick={handleOpenStore}
        >
            {isLoading && <Loading />}
            {error ? (
                <Error msg={error} />
            ) : openFlag ? (
                <span>
                    <i className="fas fa-door-open"></i>
                    {detail && <span className="ms-2">open</span>}
                </span>
            ) : (
                <span>
                    <i className="fas fa-door-closed"></i>
                    {detail && <span className="ms-2">closed</span>}
                </span>
            )}
        </button>
    );
};

export default OpenCloseStoreButton;
