const IMG = process.env.REACT_APP_STATIC_URL;

const Avatar = ({ avatar = '', name = '', bodername = false }) => (
    <div className="cus-avatar-wrap">
        <div className="cus-avatar-box">
            <div className="cus-avatar">
                <img src={`${IMG + avatar}`} className="cus-avatar-img" alt="avatar" />
            </div>
        </div>

        <h1 className={`mt-2 p-1 rounded-3 d-inline-block fs-5 ${bodername ? 'bg-body shadow' : ''}`}>
            {name}
        </h1>
    </div>
);

export default Avatar;