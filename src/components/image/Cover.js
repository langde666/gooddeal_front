import UserCoverUpload from './uploadButton.js/UploadCoverButton';

const IMG = process.env.REACT_APP_STATIC_URL;

const Cover = ({ cover = '', alt = 'cover', isEditable = false }) => (
    <div className="cus-cover-wrap">
        <div className="cus-cover">
            <img src={`${IMG + cover}`} className="cus-cover-img" alt={alt} />
            {isEditable == 'user' && (
                <UserCoverUpload />
            )}
        </div>
    </div>
);

export default Cover;