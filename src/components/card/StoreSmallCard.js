import { Link } from 'react-router-dom';
const IMG = process.env.REACT_APP_STATIC_URL;

const StoreSmallCard = ({
    store = {},
    bodername = false,
    link = `/store/${store._id}`,
}) => (
    <span
        className={`d-inline-flex align-items-center ${
            bodername && 'bg-body shadow p-1 rounded-2'
        }`}
    >
        <Link className="text-reset text-decoration-none me-2" to={link}>
            <img
                src={`${IMG + store.avatar}`}
                className="small-card-img"
                alt={store.name}
            />
        </Link>

        <Link className="text-reset link-hover mt-2" to={link}>
            <span className="fs-6 fw-bold">{store.name}</span>
        </Link>
    </span>
);

export default StoreSmallCard;
