import AuthCover from "../ui/AuthCover";
import AuthAvatar from "../ui/AuthAvatar";
import ProfileForm from './form/ProfileForm';
import AmountOrder from './form/AmountOrder';
import AccountInfo from './form/AccountInfo';

const Profile = (props) => {
    return (
        <div className="profile">
            <div className="row">
                <div className="col-12 cus-row-profile">
                    <AuthCover />
                    <div className="avatar-absolute">
                        <AuthAvatar isEditable={true} />
                    </div>
                </div>

                <div className="col-12 mt-4">
                    <div className="row">
                        <div className="col mx-1">
                            <ProfileForm />
                        </div>

                        <div className="col mx-1">
                            <div className="row">
                                <div className="col-12">
                                    <AmountOrder />
                                </div>
                                <div className="col-12 mt-2">
                                    <AccountInfo />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile;