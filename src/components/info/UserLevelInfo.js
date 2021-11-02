import UserLevelLabel from '../label/UserLevelLabel';
import Paragraph from "../ui/Paragraph";

const UserLevelInfo = ({ user = {} }) => (
    <div className="profile-form row bg-body shadow rounded-3">
        <div className="col-12">
            <Paragraph
                label="Point"
                value={(
                    <span className="d-flex justify-content-right align-items-center">
                        {user.point}
                        <small className="ms-2">
                            <UserLevelLabel level={user.level} />
                        </small>
                    </span>
                )}
            />
        </div>

        <div className="col-12">
            <Paragraph
                label="Sucessful / failed orders"
                value={(<span>
                    <i className="far fa-check-circle me-1 text-info"></i>{user.numberOfSucessfulOrders}
                    {' '}/{' '}
                    <i className="far fa-times-circle me-1 text-danger"></i>{user.numberOfFailedOrders}
                </span>)}
            />
        </div>

        <div className="col-12">
        </div>
    </div>
);

export default UserLevelInfo;