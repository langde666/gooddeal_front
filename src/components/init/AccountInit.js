import { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getToken, signout } from '../../apis/auth';
import { getUserProfile } from '../../apis/user';
import { getUserLevel } from '../../apis/level';
import { addAccount } from '../../actions/account';
import Loading from '../ui/Loading';
import Error from '../ui/Error';
import ConfirmDialog from '../ui/ConfirmDialog';

const IMG = process.env.REACT_APP_STATIC_URL;

const AccountInit = ({ user, actions }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);
    const [error, setError] = useState('');

    const { firstname, lastname, avatar, role } = user;
    const history = useHistory();
    const { _id, accessToken, refreshToken } = getToken();

    const init = () => {
        setIsLoading(true);
        setError('');
        getUserProfile(_id, accessToken)
            .then(async data => {
                if (data.error) {
                    setError(data.error);
                    setIsLoading(false);
                } else {
                    const newUser = data.user;

                    try {
                        const data = await getUserLevel(_id);
                        newUser.level = data.error ? {} : data.level;
                    } catch { }

                    try {
                        //call api get numberOfSucessfulOrders, numberOfFailedOrders
                        newUser.numberOfSucessfulOrders = 0;
                        newUser.numberOfFailedOrders = 0
                    } catch { }

                    actions(newUser);
                    setIsLoading(false);
                }
            })
            .catch((error) => {
                setError('Server error');
                setIsLoading(false);
            });
    };

    useEffect(() => {
        if (!firstname && !lastname && !avatar) init();
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
        isLoading ? (
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
                    <Link
                        type="button"
                        className="your-account-card btn btn-outline-light cus-outline ripple"
                        to='/account/profile'
                    >
                        <img
                            src={avatar ? `${IMG + avatar}` : ''}
                            className="your-account-img"
                        />

                        <span className="your-account-name noselect">
                            {firstname && lastname && firstname + ' ' + lastname}
                            {error && <Error msg={error} />}
                        </span>
                    </Link>

                    <ul className="list-group your-account-options">
                        <Link className="list-group-item your-account-options-item ripple" to="/account/profile">
                            <i className="fas fa-user-circle"></i>
                            Your profile
                        </Link>

                        {role == 'user' && <Link className="list-group-item your-account-options-item ripple" to="/account/purchase">
                            <i className="fas fa-shopping-bag"></i>
                            Purchases
                        </Link>}

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
    return { user: state.account.user }
}

function mapDispatchToProps(dispatch) {
    return { actions: (user) => dispatch(addAccount(user)) }
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountInit);