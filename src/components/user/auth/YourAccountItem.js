import { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useSelector, useDispatch, connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as actionCreators from '../../../actions/user';
import { getToken, signout } from '../../../apis/auth';
import { getUserProfile } from '../../../apis/user';
import { addUser } from '../../../actions/user';
import Loading from '../../ui/Loading';
import Error from '../../ui/Error';
import ConfirmDialog from '../../ui/ConfirmDialog';

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
                    color="danger"
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
                        <Link className="list-group-item your-account-options-item ripple" to="/user/profile">
                            <i className="fas fa-user-circle"></i>
                            Your profile
                        </Link>

                        <Link className="list-group-item your-account-options-item ripple" to="/user/purchase">
                            <i className="fas fa-shopping-bag"></i>
                            Purchases
                        </Link>

                        <li
                            className="list-group-item your-account-options-item ripple"
                            onClick={handleSignout}
                        >
                            <i className="fas fa-sign-out-alt"></i>
                            Sign out
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