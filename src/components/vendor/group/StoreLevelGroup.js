import { useState, useEffect } from 'react';
import { getStoreLevel } from '../../../apis/store';
import Paragraph from "../../ui/Paragraph";
import Loading from '../../ui/Loading';
import Error from '../../ui/Error';

const shields = {
    "normal": "#C0C0C0",
    "premium": "#FFD700",
}

const StoreLevelGroup = ({ storeId, point, number_of_successful_orders, number_of_failed_orders }) => {
    const [storeLv, setStoreLv] = useState({});
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const getStoreLv = () => {
        setError('');
        setIsLoading(true);

        getStoreLevel(storeId)
            .then(data => {
                if (data.error) {
                    setError(data.error);
                    setIsLoading(false);
                }
                else {
                    setStoreLv(data.level);
                    setIsLoading(false);
                }
            })
            .catch((error) => {
                setError('Server error');
                setIsLoading(false);
            })
    }

    useEffect(() => {
        getStoreLv();
    }, [point, storeId]);

    return (
        <div className="profile-form row py-2 border border-primary rounded-3">
            <div className="col-6">
                <Paragraph
                    label="Point"
                    value={point}
                />
            </div>

            <div className="col-6 mt-2">
                <div className="position-relative d-inline-block">
                    {isloading && <Loading size="small" />}
                    <span className='badge cus-tooltip' style={{ backgroundColor: shields[storeLv.name] }}>
                        <i className="fas fa-shield-alt me-2"></i>
                        {!storeLv.name && error && <Error msg={error} />}
                        {storeLv.name}
                    </span>
                    <small className='cus-tooltip-msg'>
                        Floor point: {storeLv.minPoint} - Discount: {storeLv.discount
                            && (storeLv.discount.$numberDecimal * 100).toFixed(2)}%
                    </small>
                </div>
            </div>

            <div className="col-12">
                <Paragraph
                    label="Sucessful / failed orders"
                    value={number_of_successful_orders + ' / ' + number_of_failed_orders}
                />
            </div>
        </div>
    )
}

export default StoreLevelGroup;