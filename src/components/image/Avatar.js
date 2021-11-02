import UserAvatarUpload from './uploadButton.js/UserAvatarUpload';

const IMG = process.env.REACT_APP_STATIC_URL;

const Avatar = ({ avatar = '', name = '', alt = 'avatar', bodername = false, isEditable = false }) => (
    <div className="cus-avatar-wrap">
        <div className="cus-avatar-box">
            <div className="cus-avatar">
                <img src={`${IMG + avatar}`} className="cus-avatar-img" alt={alt} />
                {isEditable == 'user' && (
                    <UserAvatarUpload />
                )}
            </div>
        </div>

        <h1 className={`mt-2 p-1 rounded-3 d-inline-block fs-5 ${bodername ? 'bg-body shadow' : ''}`}>
            {name}
        </h1>
    </div>
);

export default Avatar;