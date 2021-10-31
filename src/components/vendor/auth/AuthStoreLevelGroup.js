import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addVendor } from '../../../actions/vendor';
import { getStoreLevel } from '../../../apis/level';
import Paragraph from "../../ui/Paragraph";
import StarRating from '../../ui/StarRating';

const shields = {
    "normal": "#C0C0C0",
    "premium": "#FFD700",
}

const AuthStoreLevelGroup = (props) => {
    const store = useSelector(state => state.vendor.store);
    const [level, setLevel] = useState(() => store.level);
    const dispatch = useDispatch();

    const init = () => {
        getStoreLevel(store._id)
            .then(data => {
                if (data.error) {
                    return;
                }
                else {
                    store.level = data.level;
                    dispatch(addVendor(store));
                    setLevel(data.level);
                }
            })
            .catch((error) => {
                return;
            })
    }

    useEffect(() => {
        if (!store.level) init();
    }, [store]);

    return (
        <div className="profile-form row p-0 m-0 bg-body rounded-3 shadow">
            <div className="col-6">
                <Paragraph
                    label="Point"
                    value={(<span className="d-flex justify-content-right align-items-center">
                        <span className="me-2">{store.point}</span>
                        <span className="position-relative d-inline-block">
                            <span className='badge cus-tooltip' style={{ backgroundColor: level && shields[level.name] }}>
                                <i className='fas fa-shield-alt me-2'></i>
                                {level && level.name}
                            </span>
                            <small className='cus-tooltip-msg'>
                                Floor point: {level && level.minPoint} - Discount: {level && level.discount
                                    && (level && level.discount.$numberDecimal * 100).toFixed(2)}%
                            </small>
                        </span>
                    </span>)}
                />
            </div>

            <div className="col-6">
                <Paragraph
                    label="Rating"
                    value={(<StarRating stars={store.rating == 0 && store.number_of_reviews == 0 ? 3 : store.rating} />)}
                />
            </div>

            <div className="col-6">
                <Paragraph
                    label="Sucessful / failed orders"
                    value={(<span>
                        <i className="far fa-check-circle me-1 text-info"></i>{store.number_of_successful_orders}
                        {' '}/{' '}
                        <i className="far fa-times-circle me-1 text-danger"></i>{store.number_of_failed_orders}
                    </span>)}
                />
            </div>

            <div className="col-6">
                <Paragraph
                    label="Followers"
                    value={<span><i className="fas fa-heart me-1 link-pink"></i>{store.number_of_followers}</span>}
                />
            </div>
        </div>
    );
}
export default AuthStoreLevelGroup;