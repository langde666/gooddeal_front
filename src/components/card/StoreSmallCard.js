import { Link } from 'react-router-dom';
const IMG = process.env.REACT_APP_STATIC_URL;

const StoreSmallCard = ({ store = {}, bodername = false }) => (
    <div
        className={`d-inline-flex align-items-center ${
            bodername && 'bg-body shadow p-1 rounded-2'
        }`}
    >
        <Link
            className="text-reset text-decoration-none me-2"
            to={`/store/${store._id}`}
        >
            <img
                src={`${IMG + store.avatar}`}
                className="small-card-img"
                alt={store.name}
            />
        </Link>

        <Link
            className="text-reset text-decoration-none link-hover mt-2"
            to={`/store/${store._id}`}
        >
            <h6 className="">{store.name}</h6>
        </Link>
    </div>
);

export default StoreSmallCard;
