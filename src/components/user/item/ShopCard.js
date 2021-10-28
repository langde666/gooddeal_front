import { Link } from 'react-router-dom';
import StoreLevel from '../../store/item/StoreLevel';
import StarRating from '../../ui/StarRating';

const IMG = process.env.REACT_APP_STATIC_URL;
const commissionIcons = {
    "small business": <i className="fas fa-cash-register"></i>,
    "business": <i className="fas fa-building"></i>,
};

const ShopCard = ({ store, userId }) => (
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
                <div className="level-wrap d-flex justify-content-between align-items-center">
                    <div className="d-flex flex-nowrap">
                        <div className="position-relative d-inline-block me-1">
                            <span className='badge cus-tooltip bg-primary'>
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
                    </div>

                    <div className="d-flex flex-nowrap">
                        {userId == store.ownerId._id ? (
                            <div className="d-inline-block position-relative">
                                <span className="badge bg-info cus-tooltip">
                                    <i className="fas fa-user-shield"></i>
                                </span>
                                <small className="cus-tooltip-msg">owner</small>
                            </div>
                        ) : (
                            <div className="d-inline-block position-relative">
                                <span className="badge bg-primary cus-tooltip">
                                    <i className="fas fa-user-friends"></i>
                                </span>
                                <small className="cus-tooltip-msg">staff</small>
                            </div>
                        )}

                        {store.isActive ? (
                            <div className="d-inline-block position-relative">
                                <span className="badge bg-primary ms-1 cus-tooltip">
                                    <i className="fas fa-check-circle"></i>
                                </span>
                                <small className="cus-tooltip-msg">Licensed shop</small>
                            </div>
                        ) : (
                            <div className="d-inline-block position-relative">
                                <span className="badge bg-danger ms-1 cus-tooltip">
                                    <i className="fas fa-times-circle"></i>
                                </span>
                                <small className="cus-tooltip-msg">Unlicensed, keep perfecting your shop to get licensed by GoodDeal!</small>
                            </div>
                        )}
                    </div>
                </div>

                <StarRating stars={store.rating || 3} />
            </small>

            <Link className="text-reset text-decoration-none link-hover" to={`/store/${store._id}`}>
                <h6 className="card-title text-nowrap mt-2">
                    {store.name}
                </h6>
            </Link>

            <Link
                type="button"
                className="btn btn-primary w-100 mt-1"
                to={`/vendor/${store._id}`}>
                Dashboard
            </Link>
        </div>
    </div>
);

export default ShopCard;