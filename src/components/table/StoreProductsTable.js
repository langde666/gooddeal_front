import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getToken } from '../../apis/auth';
import { listProductsForManager } from '../../apis/product';
import { humanReadableDate } from '../../helper/humanReadable';
import { formatPrice } from '../../helper/formatPrice';
import Pagination from '../ui/Pagination';
import SearchInput from '../ui/SearchInput';
import SortByButton from './sub/SortByButton';
import CategorySmallCard from '../card/CategorySmallCard';
import ProductLicenseLabel from '../label/ProductLicenseLabel';
import SellStoreProductButton from '../button/SellStoreProductButton';
import Loading from '../ui/Loading';
import Error from '../ui/Error';
import StyleValueSelector from '../seletor/StyleValueSelector';

const IMG = process.env.REACT_APP_STATIC_URL;

const StoreProductsTable = ({
    heading = true,
    isSelling = true,
    storeId = '',
}) => {
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [run, setRun] = useState('');

    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState({
        size: 0,
    });
    const [filter, setFilter] = useState({
        search: '',
        sortBy: 'name',
        isSelling,
        order: 'asc',
        limit: 6,
        page: 1,
    });

    const { _id, accessToken } = getToken();

    const init = () => {
        setError('');
        setIsLoading(true);
        listProductsForManager(_id, accessToken, filter, storeId)
            .then((data) => {
                if (data.error) {
                    setError(data.error);
                    setIsLoading(false);
                } else {
                    setProducts(data.products);
                    setPagination({
                        size: data.size,
                        pageCurrent: data.filter.pageCurrent,
                        pageCount: data.filter.pageCount,
                    });
                    setIsLoading(false);
                }
            })
            .catch((error) => {
                setError('Server Error');
                setIsLoading(false);
            });
    };

    useEffect(() => {
        init();
    }, [filter, storeId, run]);

    useEffect(() => {
        setFilter({
            ...filter,
            isSelling,
        });
    }, [isSelling]);

    const handleChangeKeyword = (keyword) => {
        setFilter({
            ...filter,
            search: keyword,
            page: 1,
        });
    };

    const handleChangePage = (newPage) => {
        setFilter({
            ...filter,
            page: newPage,
        });
    };

    const handleSetSortBy = (order, sortBy) => {
        setFilter({
            ...filter,
            sortBy,
            order,
        });
    };

    return (
        <div className="vendor-products-manager-table-wrap position-relative">
            {isloading && <Loading />}

            {heading && (
                <h4 className="mb-3">
                    {isSelling ? 'Selling products' : 'Stored products'}
                </h4>
            )}

            {isloading && <Loading />}
            {error && <Error msg={error} />}

            <div className="d-flex justify-content-between align-items-end">
                <div className="option-wrap d-flex align-items-center">
                    <SearchInput onChange={handleChangeKeyword} />

                    {isSelling && (
                        <div className="ms-2">
                            <Link
                                type="button"
                                className="btn btn-primary ripple text-nowrap"
                                to={`/vendor/products/createNewProduct/${storeId}`}
                            >
                                <i className="fas fa-plus-circle me-2"></i>New
                                product
                            </Link>
                        </div>
                    )}
                </div>
                <span className="me-2">{pagination.size || 0} results</span>
            </div>

            <div
                style={{
                    overflow: 'auto',
                }}
            >
                <table className="vendor-products-manager-table table align-middle table-hover table-bordered mt-2 table-sm text-center">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">
                                <SortByButton
                                    currentOrder={filter.order}
                                    currentSortBy={filter.sortBy}
                                    title="Name"
                                    sortBy="name"
                                    onSet={(order, sortBy) =>
                                        handleSetSortBy(order, sortBy)
                                    }
                                />
                            </th>
                            <th scope="col">
                                <SortByButton
                                    currentOrder={filter.order}
                                    currentSortBy={filter.sortBy}
                                    title="Avatar"
                                    sortBy="listImages"
                                    onSet={(order, sortBy) =>
                                        handleSetSortBy(order, sortBy)
                                    }
                                />
                            </th>

                            <th scope="col">
                                <SortByButton
                                    currentOrder={filter.order}
                                    currentSortBy={filter.sortBy}
                                    title="Other images"
                                    sortBy="listImages"
                                    onSet={(order, sortBy) =>
                                        handleSetSortBy(order, sortBy)
                                    }
                                />
                            </th>

                            <th scope="col">
                                <SortByButton
                                    currentOrder={filter.order}
                                    currentSortBy={filter.sortBy}
                                    title="Desctiption"
                                    sortBy="description"
                                    onSet={(order, sortBy) =>
                                        handleSetSortBy(order, sortBy)
                                    }
                                />
                            </th>
                            <th scope="col">
                                <SortByButton
                                    currentOrder={filter.order}
                                    currentSortBy={filter.sortBy}
                                    title="Price"
                                    sortBy="price"
                                    onSet={(order, sortBy) =>
                                        handleSetSortBy(order, sortBy)
                                    }
                                />
                            </th>
                            <th scope="col">
                                <SortByButton
                                    currentOrder={filter.order}
                                    currentSortBy={filter.sortBy}
                                    title="Promotional price"
                                    sortBy="promotionalPrice"
                                    onSet={(order, sortBy) =>
                                        handleSetSortBy(order, sortBy)
                                    }
                                />
                            </th>
                            <th scope="col">
                                <SortByButton
                                    currentOrder={filter.order}
                                    currentSortBy={filter.sortBy}
                                    title="Quantity"
                                    sortBy="quantity"
                                    onSet={(order, sortBy) =>
                                        handleSetSortBy(order, sortBy)
                                    }
                                />
                            </th>
                            <th scope="col">
                                <SortByButton
                                    currentOrder={filter.order}
                                    currentSortBy={filter.sortBy}
                                    title="Sold"
                                    sortBy="sold"
                                    onSet={(order, sortBy) =>
                                        handleSetSortBy(order, sortBy)
                                    }
                                />
                            </th>
                            <th scope="col">
                                <SortByButton
                                    currentOrder={filter.order}
                                    currentSortBy={filter.sortBy}
                                    title="Category"
                                    sortBy="categoryId"
                                    onSet={(order, sortBy) =>
                                        handleSetSortBy(order, sortBy)
                                    }
                                />
                            </th>
                            <th scope="col">
                                <SortByButton
                                    currentOrder={filter.order}
                                    currentSortBy={filter.sortBy}
                                    title="Styles"
                                    sortBy="styleValueIds"
                                    onSet={(order, sortBy) =>
                                        handleSetSortBy(order, sortBy)
                                    }
                                />
                            </th>
                            <th scope="col">
                                <SortByButton
                                    currentOrder={filter.order}
                                    currentSortBy={filter.sortBy}
                                    title="License"
                                    sortBy="isActive"
                                    onSet={(order, sortBy) =>
                                        handleSetSortBy(order, sortBy)
                                    }
                                />
                            </th>
                            <th scope="col">
                                <SortByButton
                                    currentOrder={filter.order}
                                    currentSortBy={filter.sortBy}
                                    title="Created at"
                                    sortBy="createdAt"
                                    onSet={(order, sortBy) =>
                                        handleSetSortBy(order, sortBy)
                                    }
                                />
                            </th>

                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>
                                    <small>{product.name}</small>
                                </td>
                                <td>
                                    <div
                                        style={{
                                            position: 'relative',
                                            paddingBottom: '72px',
                                            width: '72px',
                                            height: '0',
                                        }}
                                    >
                                        <img
                                            src={IMG + product.listImages[0]}
                                            alt={product.name}
                                            style={{
                                                position: 'absolute',
                                                width: '100%',
                                                height: '100%',
                                                top: '0',
                                                left: '0',
                                                objectFit: 'cover',
                                            }}
                                        />
                                    </div>
                                </td>
                                <td>
                                    <div
                                        className="d-flex justify-content-between align-items-center"
                                        style={{
                                            width: '300px',
                                            height: '200px',
                                            overflow: 'auto',
                                        }}
                                    >
                                        {product.listImages.length > 1 ? (
                                            product.listImages.map(
                                                (image, index) => {
                                                    if (index === 0) return;

                                                    return (
                                                        <div
                                                            className="position-relative mx-auto"
                                                            key={index}
                                                            style={{
                                                                paddingBottom:
                                                                    '72px',
                                                                width: '72px',
                                                                height: '0',
                                                            }}
                                                        >
                                                            <img
                                                                className="position-absolute"
                                                                src={
                                                                    IMG + image
                                                                }
                                                                alt="other images"
                                                                style={{
                                                                    width: '100%',
                                                                    height: '100%',
                                                                    top: '0',
                                                                    left: '0',
                                                                    objectFit:
                                                                        'cover',
                                                                }}
                                                            />
                                                        </div>
                                                    );
                                                },
                                            )
                                        ) : (
                                            <small className="mx-auto">
                                                No other images
                                            </small>
                                        )}
                                    </div>
                                </td>
                                <td>
                                    <div
                                        style={{
                                            width: '300px',
                                            maxHeight: '200px',
                                            overflow: 'auto',
                                        }}
                                    >
                                        <small>{product.description}</small>
                                    </div>
                                </td>
                                <td>
                                    <small>
                                        {product.price &&
                                            formatPrice(
                                                product.price.$numberDecimal,
                                            )}
                                        VND
                                    </small>
                                </td>
                                <td>
                                    <small>
                                        {product.promotionalPrice &&
                                            formatPrice(
                                                product.promotionalPrice
                                                    .$numberDecimal,
                                            )}
                                        VND
                                    </small>
                                </td>
                                <td>
                                    <small>{product.quantity}</small>
                                </td>
                                <td>
                                    <small>{product.sold}</small>
                                </td>
                                <td
                                    style={{
                                        minWidth: '300px',
                                    }}
                                >
                                    <CategorySmallCard
                                        category={product.categoryId}
                                    />
                                </td>
                                <td>
                                    <div
                                        className="d-flex justify-content-start align-items-center text-start"
                                        style={{
                                            width: '300px',
                                            height: '200px',
                                            overflow: 'auto',
                                        }}
                                    >
                                        {product.styleValueIds &&
                                        product.styleValueIds.length > 0 ? (
                                            <StyleValueSelector
                                                listValues={
                                                    product.styleValueIds
                                                }
                                                isEditable={false}
                                            />
                                        ) : (
                                            <small className="mx-auto">
                                                No styles
                                            </small>
                                        )}
                                    </div>
                                </td>
                                <td>
                                    <small>
                                        <ProductLicenseLabel
                                            isActive={product.isActive}
                                        />
                                    </small>
                                </td>
                                <td>
                                    <small>
                                        {humanReadableDate(product.createdAt)}
                                    </small>
                                </td>
                                <td>
                                    <div className="d-flex justify-content-center align-items-center">
                                        <div className="position-relative d-inline-block me-2">
                                            <div className="cus-tooltip d-inline-block text-start">
                                                <SellStoreProductButton
                                                    productId={product._id}
                                                    storeId={
                                                        product.storeId._id
                                                    }
                                                    isSelling={
                                                        product.isSelling
                                                    }
                                                    onRun={() => setRun(!run)}
                                                />
                                            </div>

                                            <small className="cus-tooltip-msg">
                                                {isSelling
                                                    ? 'Store this product'
                                                    : 'Sell this product'}
                                            </small>
                                        </div>

                                        <div className="position-relative d-inline-block me-2">
                                            <Link
                                                type="button"
                                                className="btn btn-primary ripple cus-tooltip"
                                                to={`/vendor/products/editProduct/${product._id}/${storeId}`}
                                            >
                                                <i className="fas fa-pen"></i>
                                            </Link>
                                            <small className="cus-tooltip-msg">
                                                Edit product
                                            </small>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {pagination.size != 0 && (
                <Pagination
                    pagination={pagination}
                    onChangePage={handleChangePage}
                />
            )}
        </div>
    );
};

export default StoreProductsTable;
