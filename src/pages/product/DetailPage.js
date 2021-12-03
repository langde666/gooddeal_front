import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getToken } from '../../apis/auth';
import { getProduct } from '../../apis/product';
import {
    getNumberOfFollowersForProduct,
    checkFollowingProduct,
} from '../../apis/follow';
import { formatPrice } from '../../helper/formatPrice';
import MainLayout from '../../components/layout/MainLayout';
import Loading from '../../components/ui/Loading';
import Error from '../../components/ui/Error';
import Carousel from '../../components/image/Carousel';
import StarRating from '../../components/label/StarRating';
import FollowProductButton from '../../components/button/FollowProductButton';
import AddToCartForm from '../../components/item/form/AddToCartForm';
import Paragraph from '../../components/ui/Paragraph';
import CategorySmallCard from '../../components/card/CategorySmallCard';
import StoreSmallCard from '../../components/card/StoreSmallCard';
import ListBestSellerProducts from '../../components/list/ListBestSellerProduct';
import ListProductsByStore from '../../components/list/ListProductsByStore';
import SigninButton from '../../components/item/SigninItem';
import ListReviews from '../../components/list/ListReviews';

const DetailPage = () => {
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const [product, setProduct] = useState({});
    const { productId } = useParams();

    const init = () => {
        setError('');
        setIsLoading(true);
        getProduct(productId)
            .then(async (data) => {
                if (data.error) setError(data.error);
                else if (
                    data.product &&
                    data.product.storeId &&
                    !data.product.storeId.isActive
                )
                    setError('This store is banned by GoodDeal!');
                else {
                    const newProduct = data.product;
                    //get count followers
                    try {
                        const res = await getNumberOfFollowersForProduct(
                            newProduct._id,
                        );
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
                            newProduct._id,
                        );
                        newProduct.isFollowing = res.success ? true : false;
                    } catch {
                        newProduct.isFollowing = false;
                    }

                    setProduct(newProduct);
                }
                setIsLoading(false);
            })
            .catch((error) => {
                setError('Server Error');
                setIsLoading(false);
            });
    };

    useEffect(() => {
        init();
    }, [productId]);

    return (
        <MainLayout container="container" navFor="user">
            <div className="product-detail-page position-relative">
                {isloading && <Loading />}
                {error ? (
                    <Error msg={error} />
                ) : (
                    <div className="row">
                        <div className="col-8">
                            <Carousel
                                listImages={product.listImages}
                                alt={product.name}
                                style={{
                                    paddingBottom: 'calc(2/3*100%)',
                                }}
                            />

                            <div className="mt-5">
                                <ListReviews productId={product._id} />
                            </div>
                        </div>

                        <div className="col-4">
                            <StarRating stars={product.rating} />
                            <h1 className="fs-4">{product.name}</h1>

                            <div className="d-flex justify-content-right align-items-center mt-3">
                                <h2 className="text-primary fs-3 m-0">
                                    {product.promotionalPrice &&
                                        formatPrice(
                                            product.promotionalPrice
                                                .$numberDecimal,
                                        )}{' '}
                                    VND
                                </h2>

                                <p className="text-decoration-line-through text-muted ms-2 mt-1">
                                    {product.price &&
                                        formatPrice(
                                            product.price.$numberDecimal,
                                        )}{' '}
                                    VND
                                </p>
                            </div>

                            <div className="mt-4">
                                {product.storeId && !product.storeId.isOpen && (
                                    <Error msg="This store is closed, can' t order in this time!" />
                                )}
                                {product.quantity <= 0 && (
                                    <Error msg="The product is sold out!" />
                                )}

                                {!getToken() && (
                                    <SigninButton className="w-100 btn-lg" />
                                )}

                                {product.storeId &&
                                    product.storeId.isOpen &&
                                    product.quantity > 0 &&
                                    getToken() &&
                                    getToken().role === 'user' && (
                                        <AddToCartForm product={product} />
                                    )}

                                <FollowProductButton
                                    productId={product._id}
                                    isFollowing={product.isFollowing}
                                    onRun={() =>
                                        setProduct({
                                            ...product,
                                            isFollowing: !product.isFollowing,
                                        })
                                    }
                                    className="mt-2 w-100 btn-lg"
                                />
                            </div>

                            <div className="mt-5">
                                <div className="mb-5">
                                    <CategorySmallCard
                                        category={product.categoryId}
                                        parent={true}
                                    />
                                </div>

                                <Paragraph
                                    value={product.description}
                                    label="Description"
                                    multiLine={true}
                                />

                                <div className="mt-4 px-3 d-flex justify-content-right align-items-center">
                                    <h5 className="mb-0 me-4">Your seller:</h5>
                                    <StoreSmallCard store={product.storeId} />
                                </div>
                            </div>
                        </div>

                        <div className="col-12">
                            {product.categoryId && (
                                <div className="mt-4">
                                    <ListBestSellerProducts
                                        heading="Similar Products"
                                        col="col"
                                        limit={5}
                                        categoryId={product.categoryId._id}
                                    />
                                </div>
                            )}

                            {product.storeId && (
                                <div className="mt-4">
                                    <ListProductsByStore
                                        heading={`${product.storeId.name}'s Other Products`}
                                        col="col"
                                        limit={5}
                                        storeId={product.storeId._id}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </MainLayout>
    );
};

export default DetailPage;
