import { useState, useEffect, Fragment } from 'react';
import { Link, useParams, Redirect, useHistory } from 'react-router-dom';
import { useSelector, useDispatch, connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as actionCreators from '../../actions/store';
import { getToken } from '../../apis/auth';
import { getStoreProfile } from '../../apis/store';
import { addVendor } from '../../actions/vendor';
import Loading from '../ui/Loading';
import Error from '../ui/Error';

const IMG = process.env.REACT_APP_STATIC_URL;

const VendorInit = (props) => {
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [redirect, setRedirect] = useState(false);

    const { _id, accessToken } = getToken();
    const { storeId: param } = useParams();
    let { _id: storeId, name, avatar } = useSelector(state => state.vendor.store);

    const dispatch = useDispatch();
    const history = useHistory();

    const init = () => {
        setIsLoading(true);
        setError('');

        getStoreProfile(_id, accessToken, param)
            .then((data) => {
                if (data.error) {
                    if (data.isManager === false) {
                        setRedirect(true);
                    }
                    else {
                        setError(data.error);
                        setIsLoading(false);
                    }
                } else {
                    dispatch(addVendor(data.store));
                    setIsLoading(false);
                }
            })
            .catch((error) => {
                setError('Server error');
                setIsLoading(false);
            });
    };

    useEffect(() => {
        if (!storeId || storeId != param) init();
    }, [param]);

    return (
        <Fragment>
            {redirect && (<Redirect to={{
                pathname: '/',
                state: { from: props.location },
            }} />)}

            {isloading ? (
                <div className="cus-position-relative-loading">
                    <Loading size="small" />
                </div>
            ) : (
                <div className="your-shop-wrap">
                    <div className="your-shop">
                        <div
                            className="your-shop-card btn btn-outline-light cus-outline ripple"
                            onClick={() => {
                                history.push(`/vendor/${storeId}`);
                            }}
                        >
                            <img
                                src={avatar ? `${IMG + avatar}` : ''}
                                className="your-shop-img"
                            />

                            <span className="your-shop-name noselect">
                                {!error && name}
                                {error && <Error msg={error} />}
                            </span>
                        </div>

                        <ul className="list-group your-shop-options">
                            <Link className="list-group-item your-shop-options-item ripple"
                                to={`/vendor/profile/${storeId}`}>
                                <i className="fas fa-store me-1"></i>
                                Shop profile
                            </Link>

                            <Link className="list-group-item your-shop-options-item ripple"
                                to={`/vendor/orders/${storeId}`}>
                                <i className="fas fa-clipboard me-1"></i>
                                Orders
                            </Link>

                            <Link className="list-group-item your-shop-options-item ripple"
                                to="/account/shopManager">
                                <i className="fas fa-arrow-circle-left me-1"></i>
                                Back
                            </Link>
                        </ul>
                    </div>
                </div>)}
        </Fragment>

    );
};

function mapStateToProps(state) {
    return { store: state.store }
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actionCreators, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(VendorInit);