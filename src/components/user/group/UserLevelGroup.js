import Paragraph from "../../ui/Paragraph";
import UserLevel from "../item/UserLevel";

const UserLevelGroup = ({ user = {} }) => (
    <div className="profile-form row py-2 border border-primary rounded-3">
        <div className="col-12">
            <Paragraph
                label="Point"
                value={(<span className="d-flex justify-content-right align-items-center">
                    <span className="me-2">{user.point}</span>
                    <UserLevel userId={user._id} details={true} />
                </span>)}
            />
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