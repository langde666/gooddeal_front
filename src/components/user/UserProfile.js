import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AuthCover from "./group/AuthCover";
import AuthAvatar from "./group/AuthAvatar";
import AuthProfile from './group/AuthProfile';
import AmountOrderVisit from '../ui/AmountOrderVisit';
import AccountInfoVisit from '../ui/AccountInfoVisit';

const UserProfile = (props) => {
    const user = useSelector(state => state.user.user);

    return (
        <div className="user-profile">
            <div className="row">
                <div className="col-12 position-relative pb-1">
                    <AuthCover />
                    <div className="avatar-absolute">
                        <AuthAvatar isEditable={true} />
                    </div>
                    <div className="d-flex justify-content-end mt-4 me-2">
                        <Link
                            className="btn btn-primary ripple btn-sm"
                            to={`/user/${user._id}`} target="_blank"
                        >
                            Visit Your Page <i className="fas fa-external-link-alt ms-1"></i>
                        </Link>
                    </div>
                </div>

                <div className="col-12 mt-4">
                    <div className="row">
                        <div className="col mx-1">
                            <AuthProfile />
                        </div>

                        <div className="col mx-1">
                            <div className="row">
                                <div className="col-12">
                                    <AmountOrderVisit
                                        userId={user._id}
                                        point={user.point}
                                        number_of_successful_orders={user.number_of_successful_orders} number_of_failed_orders={user.number_of_failed_orders}
                                    />
                                </div>
                                <div className="col-12 mt-2">
                                    <AccountInfoVisit
                                        role={user.role}
                                        createdAt={user.createdAt}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserProfile;