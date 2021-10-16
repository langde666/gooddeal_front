import { Link } from 'react-router-dom';
import { useSelector, connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as actionCreators from '../../../actions/user';

const ShopManagerItem = (props) => {
    const count = 0;
    //call api for new orders of user's stores

    return (
        <div className="shop-manager-item-wrap position-relative">
            <Link
                className="btn btn-outline-light cus-outline ripple cus-tooltip"
                to="/user/shopManager/orders">
                <i className="fas fa-store"></i>
            </Link>
            {<span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-info cus-tooltip">
                {count < 10 ? count : '9+'}<span className="visually-hidden">orders</span>
            </span>}
            <small className="cus-tooltip-msg">Shop Manager</small>
        </div>

    )
}

function mapStateToProps(state) {
    return { user: state.user }
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actionCreators, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopManagerItem);