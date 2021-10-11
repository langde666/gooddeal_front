const IMG = process.env.REACT_APP_STATIC_URL;

const Avatar = ({ avatar = '', firstname = '', lastname = '' }) => {
    return (
        <div className="cus-avatar-wrap">
            <div className="cus-avatar-box">
                <div className="cus-avatar">
                    <img src={`${IMG + avatar}`} className="cus-avatar-img" alt="avatar" />
                </div>
            </div>

            <h1 className="mt-2 fs-4">{firstname + ' ' + lastname}</h1>
        </div>
    );
}

export default Avatar;