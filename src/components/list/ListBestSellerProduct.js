import { useState, useEffect } from 'react';
import { listActiveProducts } from '../../apis/product';
import Loading from '../ui/Loading';
import Error from '../ui/Error';
import ProductCard from '../card/ProductCard';

const ListBestSellerProducts = ({ heading = true, col = 'col' }) => {
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const [products, setProducts] = useState([]);

    const init = () => {
        setError('');
        setIsLoading(true);
        listActiveProducts({
            search: '',
            rating: '',
            categoryId: '',
            minPrice: '',
            maxPrice: '',
            sortBy: 'sold',
            order: 'desc',
            limit: 5,
            page: 1,
        })
            .then((data) => {
                if (data.error) setError(data.error);
                else setProducts(data.products);
                setIsLoading(false);
            })
            .catch((error) => {
                setError('Server Error');
                setIsLoading(false);
            });
    };

    useEffect(() => {
        init();
    }, []);

    return (
        <div className="categories-list-wrap position-relative">
            {isloading && <Loading />}
            {error && <Error msg={error} />}

            {heading && <h4>Best Seller</h4>}

            <div className="categories-list row mt-3">
                {products &&
                    products.map((product, index) => (
                        <div className={`${col} mb-4`} key={index}>
                            <ProductCard product={product} />
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default ListBestSellerProducts;
