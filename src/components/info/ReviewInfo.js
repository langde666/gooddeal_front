import StarRating from '../label/StarRating';
import Paragraph from '../ui/Paragraph';
import UserSmallCard from '../card/UserSmallCard';
import ProductSmallCard from '../card/ProductSmallCard';

const ReviewInfo = ({ review = {}, about = true }) => (
    <div className="row py-2 border border-primary rounded-3">
        <div className="col-12 d-flex justify-content-start align-items-center">
            <UserSmallCard user={review.userId} />
            <small className="mx-2">
                <StarRating stars={review.rating} />
            </small>

            {about && <ProductSmallCard product={review.productId} />}
        </div>

        <div className="col-12">
            <Paragraph label="Content" value={review.content} />
        </div>
    </div>
);

export default ReviewInfo;
