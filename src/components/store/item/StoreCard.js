import { Link } from 'react-router-dom';
import StoreLevel from '../item/StoreLevel';

const IMG = process.env.REACT_APP_STATIC_URL;
const commissionIcons = {
    "small business": <i className="fas fa-cash-register"></i>,
    "business": <i className="fas fa-building"></i>,
};

const StoreCard = ({ store }) => {
    return (
        <div className="card shadow mb-2 border-0">
            <Link className="text-reset text-decoration-none" to={`/store/${store._id}`}>
                <div className="card-img-top cus-card-img-top">
                    <img src={IMG + store.avatar}
                        className="cus-card-img"
                        alt={store.name} />
                </div>
            </Link>

            <div className="card-body border-top border-secondary">
                <small className="card-subtitle">
                    <div className="position-relative d-inline-block me-1">
                        <span className='badge bg-primary cus-tooltip'>
                            {store.commissionId && store.commissionId.name
                                && commissionIcons[store.commissionId.name]}
                        </span>
                        <small className='cus-tooltip-msg'>
                            {store.commissionId && store.commissionId.name}
                        </small>
                    </div>
                    <StoreLevel storeId={store._id} />
                    <div className="position-relative d-inline-block ms-1">
                        <span className='badge bg-pink cus-tooltip'>
                            <i className="fas fa-heart me-1"></i>{store.number_of_followers}
                        </span>
                        <small className='cus-tooltip-msg'>followers</small>
                    </div>
                </small>
                <Link className="text-reset text-decoration-none link-hover" to={`/store/${store._id}`}>
                    <h6 className="card-title text-nowrap mt-2">
                        {store.name}
                    </h6>
                </Link>

                <Link
                    type="button"
                    className="btn btn-primary w-100 mt-2"
                    to={`/store/${store._id}`}>
                    View store
                </Link>
            </div>
        </div>
    )
}

export default StoreCard;