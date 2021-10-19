const Carousel = ({ listImages = [] }) => (
    <div className="auth-carousel-wrap position-relative">
        <div id="carouselInterval" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
                {listImages && listImages.map((image, index) => (
                    <button key={index} type="button" data-bs-target="#carouselInterval" data-bs-slide-to={`${index == 0 ? 'active' : ''}`}></button>
                ))}
            </div>
            <div className="carousel-inner rounded-3">
                {listImages && listImages.map((image, index) => (
                    <div key={index} className={`carousel-item ${index == 0 ? 'active' : ''}`} data-bs-interval="3000">
                        <div className="cus-carousel">
                            <img src={`${IMG + image}`} className="d-block w-100 cus-carousel-img" alt="featured photo" />
                        </div>
                    </div>
                ))}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselInterval" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselInterval" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    </div>
);

export default Carousel;