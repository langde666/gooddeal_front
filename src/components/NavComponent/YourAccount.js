import { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getToken, signout } from '../../apis/auth';
import { getUserProfile } from '../../apis/user';
import { addUser } from '../../actions/user';
import Loading from '../other/Loading';
import Error from '../other/Error';

const IMG = process.env.REACT_APP_STATIC_URL;

const YourAccount = (props) => {
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [userProfile, setUserProfile] = useState({});

    let history = useHistory();

    const userRedux = useSelector((state) => state.user.user);
    const dispatch = useDispatch();

    const { user, accessToken, refreshToken } = getToken();

    useEffect(() => {
        if (
            userRedux &&
            Object.keys(userRedux).length === 0 &&
            Object.getPrototypeOf(userRedux) === Object.prototype
        ) {
            init();
        } else {
            setUserProfile(userRedux);
        }
    }, []);

    const init = () => {
        setIsLoading(true);
        setError('');

        getUserProfile(user._id, accessToken, refreshToken)
            .then((data) => {
                if (data.error) {
                    setError(data.error);
                    setIsLoading(false);
                } else {
                    setUserProfile(data.user);
                    dispatch(addUser(data.user));
                    setIsLoading(false);
                }
            })
            .catch((error) => {
                setError('Server error');
                setIsLoading(false);
            });
    };

    const handleSignout = () => {
        signout(refreshToken, () => {
            history.go(0);
        });
    };

    return isloading ? (
        <Loading size="small" />
    ) : (
        <div className="your-account">
            <div
                className="your-account-card btn btn-outline-light ripple"
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
    );
};

export default YourAccount;
