import { Link } from 'react-router-dom';
const IMG = process.env.REACT_APP_STATIC_URL;

const ProductSmallCard = ({ product = {}, bodername = false }) => (
    <div
        className={`d-inline-flex align-items-center ${
            bodername && 'bg-body shadow'
        }`}
    >
        <Link
            className="text-reset text-decoration-none me-2"
            to={`/product/${product._id}`}
        >
            <img
                src={`${IMG + product.listImages[0]}`}
                className="small-card-img"
                alt={product.name}
            />
        </Link>

        <Link
            className="text-reset text-decoration-none link-hover mt-2"
            to={`/product/${product._id}`}
        >
            <h6>{product.name}</h6>
        </Link>
    </div>
);

export default ProductSmallCard;
