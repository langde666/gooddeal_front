import { useSelector } from 'react-redux';
import StoreLayout from '../../components/layout/StoreLayout';
import MainLayout from '../../components/layout/MainLayout';
import Error from '../../components/ui/Error';
import ListReviews from '../../components/list/ListReviews';

const ReviewAndRatingPage = (props) => {
    const store = useSelector((state) => state.store.store);
    return typeof store.isActive === 'boolean' && !store.isActive ? (
        <MainLayout>
            <Error msg="This store is banned by GoodDeal!" />
        </MainLayout>
    ) : (
        <StoreLayout store={store}>
            <div
                className="store-review-and-rating-page"
                style={{ maxWidth: '990px', margin: '0 auto' }}
            >
                <ListReviews storeId={store._id} />
            </div>
        </StoreLayout>
    );
};

export default ReviewAndRatingPage;
