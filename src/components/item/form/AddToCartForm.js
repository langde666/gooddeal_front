import { useState, useEffect } from 'react';
import { getToken } from '../../../apis/auth';
import { addToCart } from '../../../apis/cart';
import Loading from '../../ui/Loading';
import Error from '../../ui/Error';
import Success from '../../ui/Success';
import ConfirmDialog from '../../ui/ConfirmDialog';
import StyleValueSelector from '../../seletor/StyleValueSelector';
import useUpdateDispatch from '../../../hooks/useUpdateDispatch';

const AddToCartForm = ({ product = {} }) => {
    const [isloading, setIsLoading] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const [updateDispatch] = useUpdateDispatch();

    const [cartItem, setCartItem] = useState({});

    useEffect(() => {
        let defaultList = [];

        product.styleValueIds &&
            product.styleValueIds.forEach((value) => {
                let flag = true;
                defaultList.forEach((list) => {
                    if (value.styleId._id === list[0].styleId._id) {
                        list.push(value);
                        flag = false;
                    }

                    list.sort((a, b) => {
                        const nameA = a.name.toUpperCase();
                        const nameB = b.name.toUpperCase();
                        if (nameA < nameB) return -1;
                        if (nameA > nameB) return 1;
                        return 0;
                    });
                });

                if (flag) defaultList.push([value]);
            });

        const defaultStyleValueIds = defaultList
            .map((list) => list[0]._id)
            .join('|');
        const defaultStyleValues = defaultList.map((list) => list[0]);

        setCartItem({
            storeId: product.storeId && product.storeId._id,
            productId: product._id,
            styleValueIds: defaultStyleValueIds,
            defaultStyleValues: defaultStyleValues,
            count: 1,
        });
    }, [product]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsConfirming(true);
    };

    const onSubmit = () => {
        const { _id, accessToken } = getToken();

        setError('');
        setSuccess('');
        setIsLoading(true);
        addToCart(_id, accessToken, cartItem)
            .then((data) => {
                if (data.error) setError(data.error);
                else {
                    // console.log(data);
                    setSuccess(data.success);
                    updateDispatch('account', data.user);
                }
                setTimeout(() => {
                    setError('');
                    setSuccess('');
                }, 3000);
                setIsLoading(false);
            })
            .catch((error) => {
                setError('Server Error');
                setTimeout(() => {
                    setError('');
                }, 3000);
                setIsLoading(false);
            });
    };

    return (
        <div className="add-to-cart-form-wrap position-relative">
            {isloading && <Loading />}

            {isConfirming && (
                <ConfirmDialog
                    title="Add to cart"
                    onSubmit={onSubmit}
                    onClose={() => setIsConfirming(false)}
                />
            )}

            <form className="add-to-cart-form row mb-2">
                <div className="col-12">
                    <StyleValueSelector
                        listValues={product.styleValueIds}
                        isEditable={true}
                        defaultValue={cartItem.defaultStyleValues}
                        onSet={(values) =>
                            setCartItem({
                                ...cartItem,
                                styleValueIds: values
                                    .map((value) => value._id)
                                    .join('|'),
                            })
                        }
                    />
                </div>

                {error && (
                    <div className="col-12">
                        <Error msg={error} />
                    </div>
                )}

                {success && (
                    <div className="col-12">
                        <Success msg={success} />
                    </div>
                )}

                <div className="col-12 d-grid mt-4">
                    <button
                        type="submit"
                        className="btn btn-primary ripple btn-lg"
                        onClick={handleSubmit}
                    >
                        <i className="fas fa-cart-plus"></i>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddToCartForm;