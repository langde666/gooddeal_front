import { useState, useEffect } from 'react';
import { getStoreLevel } from '../../../apis/store';

const shields = {
    "normal": "#C0C0C0",
    "premium": "#FFD700",
}

const StoreLevel = ({ storeId, details = false }) => {
    const [storeLv, setStoreLv] = useState({});

    const getStoreLv = () => {
        getStoreLevel(storeId)
            .then(data => {
                if (data.error) {
                    return;
                }
                else {
                    setStoreLv(data.level);
                }
            })
            .catch((error) => {
                return;
            })
    }

    useEffect(() => {
        getStoreLv();
    }, [storeId]);

    return (
        <div className="position-relative d-inline-block">
            <span className='badge cus-tooltip' style={{ backgroundColor: shields[storeLv.name] }}>
                <i className={`fas fa-shield-alt ${details ? 'me-2' : ''}`}></i>
                {details && storeLv.name}
            </span>
            {!details ? (
                <small className='cus-tooltip-msg'>{storeLv.name}</small>
            ) : (
                <small className='cus-tooltip-msg'>
                    Floor point: {storeLv.minPoint} - Discount: {storeLv.discount
                        && (storeLv.discount.$numberDecimal * 100).toFixed(2)}%
                </small>
            )}
        </div>
    )
}

export default StoreLevel;