import { useState, useEffect } from 'react';
import { getToken } from '../../apis/auth';
import { openStore } from '../../apis/store';
import Loading from '../ui/Loading';
import Error from '../ui/Error';

const OpenCloseStoreButton = ({ storeId = '', isOpen = true, detail = true, className = '', onRun }) => {
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
        const flag = !openFlag;
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
                    setOpenFlag(flag);
                    if (onRun) onRun();
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
            className={`btn ${openFlag ? 'btn-outline-primary' : 'btn-outline-danger'} ripple ${className}`}
            onClick={handleOpenStore}
        >
            {isLoading && <Loading />}
            {error ? (
                <Error msg={error} />
            ) : (
                openFlag ? (
                    <span>
                        <i className="fas fa-door-open"></i>{detail && <span className="ms-2">Open</span>}
                    </span>
                ) : (
                    <span>
                        <i className="fas fa-door-closed"></i>{detail && <span className="ms-2">Closed</span>}
                    </span>))}
        </button>
    );
}

export default OpenCloseStoreButton;