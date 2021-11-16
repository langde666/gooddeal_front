import { useState, useRef } from 'react';
import StarRating from '../label/StarRating';
import Input from '../ui/Input';

const ProductFilter = ({ filter, setFilter }) => {
    const [price, setPrice] = useState({
        min: '',
        max: '',
    });
    const typingTimeoutRef = useRef(null);

    const handleFilter = (name, value) => {
        setFilter({
            ...filter,
            [name]: value,
        });

        console.log({
            ...filter,
            [name]: value,
        });
    };

    const handleSetPrice = (name1, name2, value) => {
        setPrice({
            ...price,
            [name1]: value,
        });

        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        typingTimeoutRef.current = setTimeout(() => {
            handleFilter(name2, value);
        }, 600);
    };

    const renderFilterRating = () => {
        const render = [];
        for (let i = 0; i <= 5; i++)
            render.push(
                <div key={i} className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="rating"
                        id={`rating${i}`}
                        defaultChecked={
                            i !== 0 ? filter.rating === i : filter.rating === ''
                        }
                        onClick={() => {
                            if (i === 0) handleFilter('rating', '');
                            else handleFilter('rating', i);
                        }}
                        style={{
                            cursor: 'pointer',
                        }}
                    />
                    <label
                        className="form-check-label"
                        htmlFor={`rating${i}`}
                        style={{
                            cursor: 'pointer',
                        }}
                    >
                        {i === 0 ? (
                            <span>All</span>
                        ) : (
                            <small>
                                <StarRating stars={i} /> {i !== 5 && 'up'}
                            </small>
                        )}
                    </label>
                </div>,
            );
        return render;
    };

    return (
        <div className="filter-sidebar sticky-sidebar d-flex flex-column flex-shrink-0 p-3 shadow bg-body rounded">
            <h2 className="">Filters</h2>

            <div className="mt-4">
                <h6>Sort by</h6>

                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="sortBy"
                        id="sortBy1"
                        defaultChecked={filter.sortBy === 'sold'}
                        onClick={() => handleFilter('sortBy', 'sold')}
                        style={{
                            cursor: 'pointer',
                        }}
                    />
                    <label
                        className="form-check-label"
                        htmlFor="sortBy1"
                        style={{
                            cursor: 'pointer',
                        }}
                    >
                        Best seller
                    </label>
                </div>

                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="sortBy"
                        id="sortBy2"
                        defaultChecked={filter.sortBy === 'createdAt'}
                        onClick={() => handleFilter('sortBy', 'createdAt')}
                        style={{
                            cursor: 'pointer',
                        }}
                    />
                    <label
                        className="form-check-label"
                        htmlFor="sortBy2"
                        style={{
                            cursor: 'pointer',
                        }}
                    >
                        New product
                    </label>
                </div>
            </div>

            <div className="mt-4">
                <h6>Rating</h6>
                {renderFilterRating()}
            </div>

            <div className="mt-4">
                <h6 className="mb-0">Price</h6>
                <form className="row">
                    <div className="col-12">
                        <Input
                            type="number"
                            label="Min price"
                            feedback="Please provide a valid price."
                            validator="positon|zero"
                            value={price.min}
                            onChange={(value) =>
                                handleSetPrice('min', 'minPrice', value)
                            }
                        />
                    </div>

                    <div className="col-12">
                        <Input
                            type="number"
                            label="Max price"
                            feedback="Please provide a valid price."
                            validator="positon|zero"
                            value={price.max}
                            onChange={(value) =>
                                handleSetPrice('max', 'maxPrice', value)
                            }
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductFilter;
