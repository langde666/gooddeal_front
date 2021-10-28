import Paragraph from "../../ui/Paragraph";
import StoreLevel from '../item/StoreLevel';
import StarRating from '../../ui/StarRating';

const StoreLevelGroup = ({ store = {} }) => (
    <div className="profile-form row py-2 border border-primary rounded-3">
        <div className="col-6">
            <Paragraph
                label="Point"
                value={(<span className="d-flex justify-content-right align-items-center">
                    <span className="me-2">{store.point}</span>
                    <StoreLevel storeId={store._id} details={true} />
                </span>)}
            />
        </div>

        <div className="col-6">
            <Paragraph
                label="Rating"
                value={(<StarRating stars={store.rating || 3} />)}
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

export default StoreLevelGroup;