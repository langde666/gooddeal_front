import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import UserManagerLayout from '../../components/layout/UserManagerLayout';
import AuthCover from "../../components/user/auth/AuthCover";
import AuthAvatar from "../../components/user/auth/AuthAvatar";
import AuthProfile from '../../components/user/auth/AuthProfile';
import UserAmountOrderVisit from '../../components/ui/UserAmountOrderVisit';
import UserAccountInfoVisit from '../../components/ui/UserAccountInfoVisit';

const UserProfilePage = (props) => {
    const user = useSelector(state => state.user.user);

    return (
        <UserManagerLayout className="user-profile-page">
            <div className="user-profile">
                <div className="row">
                    <div className="col-12 position-relative pb-1">
                        <AuthCover />
                        <div className="avatar-absolute">
                            <AuthAvatar isEditable={true} />
                        </div>
                        <div className="d-flex justify-content-end mt-4 me-2">
                            <Link
                                className="btn btn-outline-primary ripple btn-sm"
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
                                        <UserAmountOrderVisit
                                            userId={user._id}
                                            point={user.point}
                                            number_of_successful_orders={user.number_of_successful_orders} number_of_failed_orders={user.number_of_failed_orders}
                                        />
                                    </div>
                                    <div className="col-12 mt-2">
                                        <UserAccountInfoVisit
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
        </UserManagerLayout>
    );
};

export default UserProfilePage;
