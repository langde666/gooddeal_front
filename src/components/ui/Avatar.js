const IMG = process.env.REACT_APP_STATIC_URL;

const Avatar = ({ avatar = '', name = '', bodername = false }) => (
    <div className="cus-avatar-wrap">
        <div className="cus-avatar-box">
            <div className="cus-avatar">
                <img src={`${IMG + avatar}`} className="cus-avatar-img" alt="avatar" />
            </div>
        </div>

        <h1 className={`mt-2 px-2 py-1 rounded d-inline-block fs-5 ${bodername ? 'bg-light shadow' : ''}`}>{name}</h1>
    </div>
);

export default Avatar;