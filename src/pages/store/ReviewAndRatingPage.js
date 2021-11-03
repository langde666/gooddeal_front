import { useSelector } from 'react-redux';
import StoreLayout from '../../components/layout/StoreLayout';

const ReviewAndRatingPage = (props) => {
    const store = useSelector((state) => state.store.store);
    return (
        <StoreLayout store={store}>
            <div className="store-review-and-rating-page">
                {store && store.name + ' review & rating page...'}
            </div>
        </StoreLayout>
    );
};

export default ReviewAndRatingPage;
