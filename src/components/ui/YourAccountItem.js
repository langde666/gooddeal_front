import { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useSelector, useDispatch, connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as actionCreators from '../../actions/user';
import { getToken, signout } from '../../apis/auth';
import { getUserProfile } from '../../apis/user';
import { addUser } from '../../actions/user';
import Loading from './Loading';
import Error from './Error';
import ConfirmDialog from './ConfirmDialog';

const IMG = process.env.REACT_APP_STATIC_URL;

const YourAccountItem = (props) => {
    const [isloading, setIsLoading] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);
    const [error, setError] = useState('');

    let { firstname, lastname, avatar } = useSelector(state => state.user.user);
    const dispatch = useDispatch();
    const history = useHistory();
    const { _id, accessToken, refreshToken } = getToken();

    const init = () => {
        setIsLoading(true);
        setError('');

        getUserProfile(_id, accessToken, refreshToken)
            .then((data) => {
                if (data.error) {
                    setError(data.error);
                    setIsLoading(false);
                } else {
                    dispatch(addUser(data.user));
                    setIsLoading(false);
                }
            })
            .catch((error) => {
                setError('Server error');
                setIsLoading(false);
            });
    };

    useEffect(() => {
        if (!firstname && !lastname && !avatar) {
            init();
        }
        return;
    }, []);

    const handleSignout = () => {
        setIsConfirming(true);
    };

    const onSignoutSubmit = () => {
        setIsLoading(true);
        signout(refreshToken, () => {
            history.go(0);
        });
    }

    return (
        isloading ? (
            <div className="cus-position-relative-loading">
                <Loading size="small" />
            </div>
        ) : (
            <div className="your-account-wrap">
                {isConfirming && (<ConfirmDialog
                    title="Sign out"
                    onSubmit={onSignoutSubmit}
                    onClose={() => setIsConfirming(false)}
                />)}
                <div className="your-account">
                    <div
                        className="your-account-card btn btn-outline-light cus-outline ripple"
                        onClick={() => {
                            history.push('/user/profile');
                        }}
                    >
                        <img
                            src={avatar ? `${IMG + avatar}` : ''}
                            className="your-account-img"
                        />

                        <span className="your-account-name noselect">
                            {firstname && lastname && firstname + ' ' + lastname}
                            {error && <Error msg={error} />}
                        </span>
                    </div>

                    <ul className="list-group your-account-options">
                        <li className="list-group-item your-account-options-item">
                            <i className="fas fa-user-circle"></i>
                            <Link
                                className="text-decoration-none text-reset"
                                to="/user/profile"
                            >
                                Your profile
                            </Link>
                        </li>

                        <li className="list-group-item your-account-options-item">
                            <i className="fas fa-shopping-bag"></i>
                            <Link
                                className="text-decoration-none text-reset"
                                to="/user/purchase"
                            >
                                Purchases
                            </Link>
                        </li>

                        <li
                            className="list-group-item your-account-options-item"
                            onClick={handleSignout}
                        >
                            <i className="fas fa-sign-out-alt"></i>
                            <span>Sign out</span>
                        </li>
                    </ul>
                </div>
            </div>
        ));
};

function mapStateToProps(state) {
    return { user: state.user }
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators(actionCreators, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(YourAccountItem);