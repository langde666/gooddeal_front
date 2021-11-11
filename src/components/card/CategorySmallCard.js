import { Link } from 'react-router-dom';
const IMG = process.env.REACT_APP_STATIC_URL;

const CategorySmallCard = ({ category = {}, style = {}, parent = true }) => (
    <div className="d-inline-flex align-items-center" style={style}>
        <Link
            className="text-reset text-decoration-none me-2"
            to={`/category/${category._id}`}
        >
            <img
                src={`${IMG + category.image}`}
                className="small-card-img"
                alt={category.name}
            />
        </Link>

        <Link
            className="text-reset text-decoration-none mt-2 cus-link-hover"
            to={`/category/${category._id}`}
        >
            <h6>
                {parent &&
                    category.categoryId &&
                    category.categoryId.categoryId &&
                    category.categoryId.categoryId.name + ' > '}
                {parent &&
                    category.categoryId &&
                    category.categoryId.name + ' > '}
                {category.name}
            </h6>
        </Link>
    </div>
);

export default CategorySmallCard;
