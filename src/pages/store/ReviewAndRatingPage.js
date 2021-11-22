import { useSelector } from 'react-redux';
import StoreLayout from '../../components/layout/StoreLayout';
import MainLayout from '../../components/layout/MainLayout';
import Error from '../../components/ui/Error';

const ReviewAndRatingPage = (props) => {
    const store = useSelector((state) => state.store.store);
    return typeof store.isActive === 'boolean' && !store.isActive ? (
        <MainLayout>
            <Error msg="This store is banned by GoodDeal!" />
        </MainLayout>
    ) : (
        <StoreLayout store={store}>
            <div className="store-review-and-rating-page">
                {store && store.name + ' review & rating page...'}
            </div>
        </StoreLayout>
    );
};

export default ReviewAndRatingPage;
