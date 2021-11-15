import { useState, useEffect } from 'react';
import { getToken } from '../../apis/auth';
import { sellingProduct } from '../../apis/product';
import Loading from '../ui/Loading';
import Error from '../ui/Error';
import ConfirmDialog from '../ui/ConfirmDialog';

const SellStoreProductButton = ({
    productId = '',
    storeId = '',
    isSelling = true,
    className = '',
    onRun,
}) => {
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);
    const [sellingFlag, setSellingFlag] = useState(isSelling);

    const { _id, accessToken } = getToken();

    useEffect(() => {
        setSellingFlag(isSelling);
    }, [isSelling, productId]);

    const handleSellingProduct = () => {
        setIsConfirming(true);
    };

    const onSubmit = () => {
        setError('');
        setIsLoading(true);
        const value = { isSelling: !sellingFlag };
        sellingProduct(_id, accessToken, value, storeId, productId)
            .then((data) => {
                if (data.error) {
                    setError(data.error);
                    setIsLoading(false);
                    setTimeout(() => {
                        setError('');
                    }, 3000);
                } else {
                    setIsLoading(false);
                    setSellingFlag(!sellingFlag);
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
        <div className="sell-store-product-button-wrap position-relative">
            {isLoading && <Loading />}
            {error && <Error msg={error} />}
            {isConfirming && (
                <ConfirmDialog
                    title={
                        !sellingFlag
                            ? 'Store this product'
                            : 'Sell this product'
                    }
                    onSubmit={onSubmit}
                    onClose={() => setIsConfirming(false)}
                />
            )}
            <button
                type="button"
                className={`btn btn-outline-primary ripple ${className}`}
                onClick={handleSellingProduct}
            >
                {!sellingFlag ? (
                    <i className="fas fa-box"></i>
                ) : (
                    <i className="fas fa-archive"></i>
                )}
            </button>
        </div>
    );
};

export default SellStoreProductButton;
