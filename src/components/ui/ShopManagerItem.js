import { Link } from 'react-router-dom';

const ShopManagerItem = (props) => {
    return (
        <div className="shop-manager-wrap position-relative">
            <Link
                className="btn btn-outline-light cus-outline ripple cus-tooltip"
                to="/">
                <i className="fas fa-store"></i>
            </Link>
            <small className="cus-tooltip-msg">Shop Manager</small>
        </div>
    )
}

export default ShopManagerItem;