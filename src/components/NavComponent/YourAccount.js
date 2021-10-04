import { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { isAuthenticated, signout } from '../../apis/auth';
import { getUserProfile } from '../../apis/user';
import { addUser } from '../../actions/user';
import Loading from '../other/Loading';
import Error from '../other/Error';

const IMG = process.env.REACT_APP_STATIC_URL;

const YourAccount = (props) => {
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const { user, token, isExpired } = isAuthenticated();

    const [userProfile, setUserProfile] = useState({});

    let history = useHistory();

    const userRedux = useSelector((state) => state.user.user);
    const dispatch = useDispatch();

    const init = () => {
        setIsLoading(true);
        setError('');

        getUserProfile(user._id, token)
            .then((data) => {
                if (data.error) {
                    setError(data.error);
                    setIsLoading(false);
                } else {
                    setUserProfile(data.user);
                    setIsLoading(false);
                    dispatch(addUser(data.user));
                }
            })
            .catch((error) => {
                setError('Server error');
            });
    };

    useEffect(() => {
        if (userRedux && Object.keys(userRedux).length === 0) {
            init();
        } else {
            setUserProfile(userRedux);
        }
    }, []);

    const handleSignout = () => {
        signout(() => {
            history.go(0);
        });
    };

    return isloading ? (
        <Loading size="small" />
    ) : (
        <div className="your-account">
            <div
                className="your-account-card ripple"
                onClick={() => {
                    history.push('/user/profile');
                }}
            >
                <img
                    src={`${IMG + userProfile.avatar}`}
                    className="your-account-img"
                />

                <span className="your-account-name noselect">
                    {userProfile.firstname + ' ' + userProfile.lastname}
                    {error && <Error error={error} />}
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
                    <i className="fas fa-clipboard"></i>
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
    );
};

export default YourAccount;
