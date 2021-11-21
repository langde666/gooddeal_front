import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getToken } from '../../apis/auth';
import { listCarts } from '../../apis/cart';
import MainLayout from '../../components/layout/MainLayout';
import Loading from '../../components/ui/Loading';
import Error from '../../components/ui/Error';
import StoreSmallCard from '../../components/card/StoreSmallCard';
import ListCartItemsForm from '../../components/list/ListCartItemsForm';

const AddressesPage = (props) => {
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [run, setRun] = useState(false);

    const [carts, setCarts] = useState([]);

    const init = () => {
        const { _id, accessToken } = getToken();

        setError('');
        setIsLoading(true);
        listCarts(_id, accessToken, { limit: '100', page: '1' })
            .then((data) => {
                if (data.error) setError(data.error);
                else setCarts(data.carts);
                setIsLoading(false);
            })
            .catch((error) => {
                setError('Server error');
                setIsLoading(false);
            });
    };

    useEffect(() => {
        init();
    }, [run]);

    return (
        <MainLayout container="container" navFor="user">
            <div className="cart-page position-relave">
                {isloading && <Loading />}
                {error && <Error msg={error} />}

                <div className="accordion" id="accordionPanelsStayOpen">
                    {carts.map((cart, index) => (
                        <div className="accordion-item" key={index}>
                            <h2
                                className="accordion-header"
                                id={`panelsStayOpen-heading-${index}`}
                            >
                                <button
                                    className="accordion-button btn"
                                    type="button"
                                    data-bs-toggle="collapse"
                                    data-bs-target={`#panelsStayOpen-collapse-${index}`}
                                    aria-expanded="true"
                                    aria-controls={`panelsStayOpen-collapse-${index}`}
                                >
                                    <StoreSmallCard store={cart.storeId} />
                                </button>
                            </h2>
                            <div
                                id={`panelsStayOpen-collapse-${index}`}
                                className="accordion-collapse collapse show"
                                aria-labelledby={`panelsStayOpen-collapse-${index}`}
                            >
                                <div className="accordion-body">
                                    <ListCartItemsForm
                                        cartId={cart._id}
                                        onRun={() => setRun(!run)}
                                    />

                                    <div className="d-flex justify-content-end mt-4">
                                        <Link
                                            className="btn btn-primary ripple"
                                            to={`/checkout/${cart._id}`}
                                        >
                                            Checkout
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </MainLayout>
    );
};

export default AddressesPage;
