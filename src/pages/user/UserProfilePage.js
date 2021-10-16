import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import UserManagerLayout from '../../components/layout/UserManagerLayout';
import AuthCover from "../../components/user/auth/AuthCover";
import AuthAvatar from "../../components/user/auth/AuthAvatar";
import UserProfileGroup from '../../components/user/group/UserProfileGroup';
import UserLevelGroup from '../../components/user/group/UserLevelGroup';
import UserAccountGroup from '../../components/user/group/UserAccountGroup';

const UserProfilePage = (props) => {
    const user = useSelector(state => state.user.user);

    return (
        <UserManagerLayout>
            <div className="user-profile-page">
                <div className="row">
                    <div className="col-12 position-relative">
                        <AuthCover />
                        <div className="avatar-absolute avatar-absolute--store">
                            <AuthAvatar isEditable={true} bodername={true} />
                        </div>
                    </div>

                    <div className="col-12 d-flex justify-content-end mt-2">
                        <Link
                            className="btn btn-outline-primary ripple btn-sm"
                            to={`/user/${user._id}`} target="_blank"
                        >
                            Visit Your Page <i className="fas fa-external-link-alt ms-1"></i>
                        </Link>
                    </div>

                    <div className="col-12 mt-4">
                        <div className="row">
                            <div className="col ms-2 me-1">
                                <UserProfileGroup
                                    firstname={user.firstname}
                                    lastname={user.lastname}
                                    id_card={user.id_card}
                                    email={user.email}
                                    phone={user.phone}
                                    isEmailActive={user.isEmailActive}
                                    isPhoneActive={user.isPhoneActive}
                                    googleId={user.googleId}
                                    facebookId={user.facebookId}
                                    isEditable={true}
                                />
                            </div>

                            <div className="col ms-1 me-2">
                                <div className="row">
                                    <div className="col-12">
                                        <UserLevelGroup
                                            userId={user._id}
                                            point={user.point}
                                            number_of_successful_orders={user.number_of_successful_orders} number_of_failed_orders={user.number_of_failed_orders}
                                        />
                                    </div>
                                    <div className="col-12 mt-2">
                                        <UserAccountGroup
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
