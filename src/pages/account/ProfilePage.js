import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AccountLayout from '../../components/layout/AccountLayout';
import AuthCover from "../../components/user/auth/AuthCover";
import AuthAvatar from "../../components/user/auth/AuthAvatar";
import UserProfileGroup from '../../components/user/group/UserProfileGroup';
import UserLevelGroup from '../../components/user/group/UserLevelGroup';
import UserAccountGroup from '../../components/user/group/UserAccountGroup';

const ProfilePage = (props) => {
    const user = useSelector(state => state.account.user);

    return (
        <AccountLayout>
            <div className="account-profile-page">
                <div className="position-relative">
                    <AuthCover />
                    <div className="avatar-absolute avatar-absolute--store">
                        <AuthAvatar isEditable={true} bodername={true} />
                    </div>
                </div>

                <div className="d-flex justify-content-end mt-2">
                    <Link
                        className="btn btn-outline-primary ripple btn-sm"
                        to={`/user/${user._id}`} target="_blank"
                    >
                        Visit Your Page <i className="fas fa-external-link-alt ms-1"></i>
                    </Link>
                </div>

                <div className="row mt-4">
                    <div className="col ms-2 me-1">
                        <UserLevelGroup user={user} />
                    </div>

                    <div className="col ms-1 me-2">
                        <UserAccountGroup user={user} />
                    </div>

                    <div className="col-12 mt-2">
                        <div className="row">
                            <div className="col mx-2">
                                <UserProfileGroup user={user} isEditable={true} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AccountLayout>
    );
};

export default ProfilePage;
