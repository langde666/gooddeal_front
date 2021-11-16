import { useState, useEffect } from 'react';
import { listActiveCategories } from '../../apis/category';
import Loading from '../ui/Loading';
import Error from '../ui/Error';
import CategoryCard from '../card/CategoryCard';

const ListCategories = ({ heading = true, categoryId = null, col = 'col' }) => {
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const [categories, setCategories] = useState([]);

    const init = () => {
        setError('');
        setIsLoading(true);
        listActiveCategories({
            search: '',
            categoryId,
            sortBy: 'name',
            order: 'asc',
            limit: 6,
            page: 1,
        })
            .then((data) => {
                if (data.error) setError(data.error);
                else setCategories(data.categories);
                setIsLoading(false);
            })
            .catch((error) => {
                setError('Server Error');
                setIsLoading(false);
            });
    };

    useEffect(() => {
        init();
    }, [categoryId]);

    return (
        <div className="categories-list-wrap position-relative">
            {isloading && <Loading />}
            {error && <Error msg={error} />}

            {heading && <h4>Discover</h4>}

            <div className="categories-list row mt-3">
                {categories &&
                    categories.map((category, index) => (
                        <div className={`${col} mb-4`} key={index}>
                            <CategoryCard category={category} />
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default ListCategories;
