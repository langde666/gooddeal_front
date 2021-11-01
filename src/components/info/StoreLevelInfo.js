import StoreLevelLabel from '../label/StoreLevelLabel';
import Paragraph from "../ui/Paragraph";
import StarRating from '../ui/StarRating';

const StoreLevelInfo = ({ store = {} }) => (
    <div className="profile-form row bg-body rounded-3">
        <div className="col-6">
            <Paragraph
                label="Point"
                value={(
                    <span className="d-flex justify-content-right align-items-center">
                        {store.point}
                        <small className="ms-2">
                            <StoreLevelLabel level={store.level} />
                        </small>
                    </span>
                )}
            />
        </div>

        <div className="col-6">
            <Paragraph
                label="Rating"
                value={(<StarRating stars={store.rating == 0 && store.number_of_reviews == 0 ? 3 : store.rating} />)}
            />
        </div>

        <div className="col-6">
            <Paragraph
                label="Sucessful / failed orders"
                value={(<span>
                    <i className="far fa-check-circle me-1 text-info"></i>{store.number_of_successful_orders}
                    {' '}/{' '}
                    <i className="far fa-times-circle me-1 text-danger"></i>{store.number_of_failed_orders}
                </span>)}
            />
        </div>

        <div className="col-6">
            <Paragraph
                label="Followers"
                value={<span><i className="fas fa-heart me-1 link-pink"></i>{store.number_of_followers}</span>}
            />
        </div>
    </div>
);

export default StoreLevelInfo;