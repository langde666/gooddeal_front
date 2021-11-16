import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getToken } from '../../apis/auth';
// import { getNumberOfFollowersForProduct, checkFollowingProduct } from '../../apis/follow';
import StoreCommissionLabel from '../label/StoreCommissionLabel';
import StoreFollowLabel from '../label/StoreFollowLabel';
import StarRating from '../label/StarRating';

const IMG = process.env.REACT_APP_STATIC_URL;

const ProductCard = ({ product = {}, onRun }) => {
    const [productValue, setProductValue] = useState({});

    const init = async () => {
        let newProduct = product;

        try {
            // const data = await getNumberOfFollowersForProduct(product._id);
            // newProduct.numberOfFollowers = data.count;

            newProduct.numberOfFollowers = 0;
        } catch {}

        try {
            // const { _id, accessToken } = getToken();
            // const data = await checkFollowingProduct(_id, accessToken, product._id);
            // newProduct.isFollowing = data.success ? true : false;

            newProduct.isFollowing = false;
        } catch {}

        setProductValue(newProduct);
    };

    useEffect(() => {
        init();
    }, [product]);

    const onHandleRun = async (newProduct) => {
        if (onRun) onRun(newProduct);

        let numberOfFollowers;
        try {
            // const data = await getNumberOfFollowersForProduct(newProduct._id);
            // numberOfFollowers = data.count;
            const currentNumberOfFollowers = productValue.numberOfFollowers;
            numberOfFollowers = newProduct.isFollowing
                ? currentNumberOfFollowers + 1
                : currentNumberOfFollowers - 1;
        } catch {
            const currentNumberOfFollowers = productValue.numberOfFollowers;
            numberOfFollowers = newProduct.isFollowing
                ? currentNumberOfFollowers + 1
                : currentNumberOfFollowers - 1;
        }

        setProductValue({
            ...productValue,
            numberOfFollowers,
        });
    };

    return (
        <div className="card shadow border-0">
            <Link
                className="text-reset text-decoration-none"
                to={`/product/${productValue._id}`}
                title={product.name}
            >
                <div className="card-img-top cus-card-img-top">
                    <img
                        src={
                            productValue.listImages &&
                            IMG + productValue.listImages[0]
                        }
                        className="cus-card-img"
                        alt={productValue.name}
                    />
                </div>
            </Link>

            <div className="card-body border-top border-secondary">
                <small className="card-subtitle">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                            <span className="">
                                <StoreFollowLabel
                                    numberOfFollowers={
                                        productValue.numberOfFollowers
                                    }
                                />
                            </span>
                        </div>
                    </div>

                    <StarRating stars={product.rating} />
                </small>

                <Link
                    className="text-reset text-decoration-none link-hover d-block mt-1 mb-2"
                    to={`/product/${product._id}`}
                    style={{
                        width: '200px',
                        maxWidth: '100%',
                        height: '38px',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        display: '-webkit-box',
                        WebkitLineClamp: '3',
                        WebkitBoxOrient: 'vertical',
                    }}
                    title={product.name}
                >
                    <h6 className="card-title">{product.name}</h6>
                </Link>

                <small className="card-subtitle">
                    <p className="text-decoration-line-through">
                        {productValue.price &&
                            formatPrice(productValue.price.$numberDecimal)}{' '}
                        VND
                    </p>
                    <h6 className="text-primary">
                        {productValue.promotionalPrice &&
                            formatPrice(
                                productValue.promotionalPrice.$numberDecimal,
                            )}{' '}
                        VND
                    </h6>
                </small>

                {/* {getToken() && (
                    <FollowStoreButton
                        storeId={store._id}
                        isFollowing={store.isFollowing}
                        className="w-100 mt-1"
                        onRun={(store) => onHandleRun(store)}
                    />
                )} */}
            </div>
        </div>
    );
};

export default ProductCard;

const formatPrice = (price) =>
    new Intl.NumberFormat('de-DE', { maximumSignificantDigits: 3 }).format(
        price,
    );
