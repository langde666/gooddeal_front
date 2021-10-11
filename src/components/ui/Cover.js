const IMG = process.env.REACT_APP_STATIC_URL;

const Cover = ({ cover = '' }) => {
    return (
        <div className="cus-cover-wrap">
            <div className="cus-cover">
                <img src={`${IMG + cover}`} className="cus-cover-img" alt="cover" />
            </div>
        </div>
    );
}

export default Cover;