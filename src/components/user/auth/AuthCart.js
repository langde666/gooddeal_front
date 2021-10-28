import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addUser } from '../../../actions/user';

const AuthCart = ({ user, actions }) => {
    const { cart } = user;
    const count = cart && cart.length > 0 ? cart.reduce((count, product) => (count + product && product.count), 0) : 0;
    return (
        <div className="cart-item-wrap position-relative">
            <Link
                className="btn btn-outline-light cus-outline ripple cus-tooltip"
                to="/">
                <i className="fas fa-shopping-basket"></i>
            </Link>
            {<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-info cus-tooltip">
                {count < 10 ? count : '9+'}<span className="visually-hidden">products</span>
            </span>}
            <small className="cus-tooltip-msg">Cart</small>
        </div>
    );
}

function mapStateToProps(state) {
    return { user: state.user.user }
}

function mapDispatchToProps(dispatch) {
    return { actions: (data) => dispatch(addUser(data.user)) }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthCart);