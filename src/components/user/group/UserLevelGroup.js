import Paragraph from "../../ui/Paragraph";
import UserLevel from "../item/UserLevel";

const UserLevelGroup = ({ user = {} }) => (
    <div className="profile-form row py-2 border border-primary rounded-3">
        <div className="col-6">
            <Paragraph
                label="Point"
                value={(<span><i className="fas fa-star link-golden me-1"></i>{user.point}</span>)}
            />
        </div>

        <div className="col-6 mt-2">
            <UserLevel userId={user._id} details={true} />
        </div>

        <div className="col-6">
            <Paragraph
                label="Sucessful / failed orders"
                value={(<span>
                    <i className="far fa-check-circle me-1 text-info"></i>{user.number_of_successful_orders}
                    {' '}/{' '}
                    <i className="far fa-times-circle me-1 text-danger"></i>{user.number_of_failed_orders}
                </span>)}
            />
        </div>

        <div className="col-6">
            <Paragraph
                label="Followers"
                value={<span><i className="fas fa-heart me-1 link-pink"></i>{user.number_of_followers || 0}</span>}
            />
        </div>
    </div>
);

export default UserLevelGroup;