import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getToken } from '../../apis/auth';
import { formatPrice } from '../../helper/formatPrice';
import {
    getNumberOfFollowersForProduct,
    checkFollowingProduct,
} from '../../apis/follow';
import FollowLabel from '../label/StoreFollowLabel';
import StarRating from '../label/StarRating';
import FollowProductButton from '../button/FollowProductButton';

const IMG = process.env.REACT_APP_STATIC_URL;

const ProductCard = ({ product = {}, onRun }) => {
    const [productValue, setProductValue] = useState({});

    const init = async () => {
        let newProduct = product;
        //get count followers
        try {
            const res = await getNumberOfFollowersForProduct(product._id);
            newProduct.numberOfFollowers = res.count;
        } catch {
            newProduct.numberOfFollowers = 0;
        }

        //check follow
        try {
            const { _id, accessToken } = getToken();
            const res = await checkFollowingProduct(
                _id,
                accessToken,
                product._id,
            );
            newProduct.isFollowing = res.success ? true : false;
        } catch {
            newProduct.isFollowing = false;
        }

        setProductValue(newProduct);
    };

    useEffect(() => {
        init();
    }, [product]);

    const onHandleRun = async (newProduct) => {
        if (onRun) onRun(newProduct);

        let numberOfFollowers;
        try {
            const data = await getNumberOfFollowersForProduct(newProduct._id);
            numberOfFollowers = data.count;
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
                                <FollowLabel
                                    numberOfFollowers={
                                        productValue.numberOfFollowers
                                    }
                                />
                            </span>
                        </div>
                    </div>

                    <StarRating stars={productValue.rating} />
                </small>

                <Link
                    className="text-reset link-hover d-block mt-1 mb-2"
                    to={`/product/${productValue._id}`}
                    title={productValue.name}
                >
                    <h6
                        className="card-title"
                        style={{
                            height: '38px',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: '2',
                            WebkitBoxOrient: 'vertical',
                        }}
                    >
                        {productValue.name}
                    </h6>
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

                {getToken() && (
                    <FollowProductButton
                        productId={productValue._id}
                        isFollowing={productValue.isFollowing}
                        className="w-100 mt-1"
                        onRun={(product) => onHandleRun(product)}
                    />
                )}
            </div>
        </div>
    );
};

export default ProductCard;
