import StarRating from '../label/StarRating';
import Paragraph from '../ui/Paragraph';
import UserSmallCard from '../card/UserSmallCard';
import ProductSmallCard from '../card/ProductSmallCard';

const ReviewInfo = ({ review = {}, about = true }) => (
    <div className="row py-2 border border-primary rounded-3">
        <div className="col-12 ms-2 d-flex justify-content-start align-items-center">
            <UserSmallCard user={review.userId} />
            {about && (
                <>
                    <i className="fas fa-comment-dots text-primary mx-4"></i>
                    <ProductSmallCard product={review.productId} />
                </>
            )}
        </div>

        <div className="col-12">
            <Paragraph
                label={
                    <small>
                        <StarRating stars={review.rating} />
                    </small>
                }
                value={review.content}
            />
        </div>
    </div>
);

export default ReviewInfo;
