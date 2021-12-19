import { Link } from 'react-router-dom';
const IMG = process.env.REACT_APP_STATIC_URL;

const ProductSmallCard = ({ product = {}, bodername = false, style = {} }) => (
    <span
        className={`d-inline-flex align-items-center ${
            bodername && 'bg-body shadow'
        }`}
        style={style}
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
            className="text-reset link-hover mt-2"
            to={`/product/${product._id}`}
            style={style}
        >
            <span className="fs-6 fw-bold">{product.name}</span>
        </Link>
    </span>
);

export default ProductSmallCard;
