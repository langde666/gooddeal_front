import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { listActiveCategories } from '../../apis/category';

const IMG = process.env.REACT_APP_STATIC_URL;

const CategoryCard = ({ category = {} }) => {
    const [categoryValue, setCategoryValue] = useState({});
    const [children, setChildren] = useState([]);

    const init = () => {
        setCategoryValue(category);

        listActiveCategories({
            search: '',
            categoryId: category._id,
            sortBy: 'name',
            order: 'asc',
            limit: 3,
            page: 1,
        })
            .then((data) => {
                if (data.error) return;
                else setChildren(data.categories);
            })
            .catch((error) => {
                return;
            });
    };

    useEffect(() => {
        init();
    }, [category]);

    return (
        <div className="card shadow border-0">
            <Link
                className="text-reset text-decoration-none"
                to={`/category/${categoryValue._id}`}
                title={categoryValue.name}
            >
                <div className="card-img-top cus-card-img-top">
                    <img
                        src={IMG + categoryValue.image}
                        className="cus-card-img"
                        alt={categoryValue.name}
                    />
                </div>
            </Link>

            <div className="card-body border-top border-secondary">
                <Link
                    className="text-reset text-decoration-none link-hover d-block mt-1"
                    to={`/category/${categoryValue._id}`}
                    title={categoryValue.name}
                >
                    <h6 className="card-title text-nowrap">
                        {categoryValue.name}
                    </h6>
                </Link>

                {children && children.length > 0 && (
                    <small
                        className="card-subtitle d-inline-block ms-2"
                        style={{ minHeight: '70px' }}
                    >
                        {children &&
                            children.map((child, index) => (
                                <Link
                                    key={index}
                                    className="text-reset text-decoration-none link-hover d-block mt-1"
                                    to={`/category/${child._id}`}
                                >
                                    {child.name}
                                </Link>
                            ))}
                    </small>
                )}
            </div>
        </div>
    );
};

export default CategoryCard;
