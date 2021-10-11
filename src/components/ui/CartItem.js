import { Link } from 'react-router-dom';

const CartItem = (props) => {
    const count = 6;

    return (
        <div className="cart-item-wrap position-relative">
            <Link
                className="btn btn-outline-light cus-outline ripple cus-tooltip"
                to="/">
                <i className="fas fa-shopping-basket"></i>
            </Link>
            {count > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-info cus-tooltip">
                    {count && count > 0 && count < 10 ? count : '9+'}<span className="visually-hidden">products</span>
                </span>
            )}
            <small className="cus-tooltip-msg">Cart</small>
        </div>

    )
}

export default CartItem;