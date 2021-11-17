import { useSelector } from 'react-redux';
import StoreLayout from '../../components/layout/StoreLayout';
import Carousel from '../../components/image/Carousel';
import ListProductsByStore from '../../components/list/ListProductsByStore';

const HomePage = (props) => {
    const store = useSelector((state) => state.store.store);
    return (
        <StoreLayout store={store}>
            <div className="store-home-page">
                <div className="mt-2">
                    <Carousel
                        listImages={store.featured_images}
                        alt={store.name}
                    />
                </div>

                <div className="mt-5">
                    <ListProductsByStore
                        heading="Best seller"
                        storeId={store._id}
                        sortBy="sold"
                        col="col-3"
                        limit="4"
                    />
                </div>

                <div className="mt-4">
                    <ListProductsByStore
                        heading="New products"
                        storeId={store._id}
                        sortBy="createdAt"
                        col="col-3"
                        limit="4"
                    />
                </div>
            </div>
        </StoreLayout>
    );
};

export default HomePage;
