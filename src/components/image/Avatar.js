import UserAvatarUpload from './uploadButton/UserAvatarUpload';
import StoreAvatarUpload from './uploadButton/StoreAvatarUpload';

const IMG = process.env.REACT_APP_STATIC_URL;

const Avatar = ({
    storeId = '',
    avatar = '',
    name = '',
    alt = 'avatar',
    bodername = false,
    isEditable = false,
    size = '',
}) => (
    <div className="cus-avatar-wrap">
        <div className={`cus-avatar-box ${size && 'cus-avatar-box--small'}`}>
            <div className="cus-avatar">
                <img
                    src={`${IMG + avatar}`}
                    className="cus-avatar-img"
                    alt={alt}
                />
                {isEditable == 'user' && <UserAvatarUpload />}
                {isEditable == 'store' && (
                    <StoreAvatarUpload storeId={storeId} />
                )}
            </div>
        </div>

        {size != 'small' && (
            <h1
                className={`mt-2 p-1 rounded-3 d-inline-block fs-5 ${
                    bodername && 'bg-body shadow'
                }`}
            >
                {name}
            </h1>
        )}
    </div>
);

export default Avatar;
