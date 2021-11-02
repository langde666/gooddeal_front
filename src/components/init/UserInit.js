import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { addUser } from '../../actions/user';
import { getUser } from '../../apis/user';
import { getUserLevel } from '../../apis/level';
import Loading from '../ui/Loading';
import Error from '../ui/Error';

const IMG = process.env.REACT_APP_STATIC_URL;

const UserInit = ({ user, actions }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const { userId } = useParams();

    const init = () => {
        setIsLoading(true);
        setError('');
        getUser(userId)
            .then(async data => {
                if (data.error) {
                    setError(data.error);
                    setIsLoading(false);
                }
                else {
                    const newUser = data.user;

                    try {
                        const data = await getUserLevel(userId);
                        newUser.level = data.error ? {} : data.level;
                    } catch { }

                    try {
                        //call api get numberOfSucessfulOrders, numberOfFailedOrders
                        newUser.numberOfSucessfulOrders = 0;
                        newUser.numberOfFailedOrders = 0
                    } catch { }

                    actions(newUser);
                    setIsLoading(false);
                    console.log(newUser);
                }
            })
            .catch(error => {
                setError('Server Error');
                setIsLoading(false);
            });
    }

    useEffect(() => {
        if (!user || user._id != userId) init();
    }, [userId]);

    return (
        isLoading ? (
            <div className="cus-position-relative-loading">
                <Loading size="small" />
            </div>
        ) : (
            <div type="button" className="your-shop-card btn btn-outline-light cus-outline ripple">
                <img
                    src={`${IMG + user.avatar}`}
                    className="your-shop-img"
                />
                <span className="your-shop-name tetx noselect">
                    {user.firstname + ' ' + user.lastname}
                    {error && <Error msg={error} />}
                </span>
            </div>
        )
    );
}

function mapStateToProps(state) {
    return { user: state.user.user }
}

function mapDispatchToProps(dispatch) {
    return { actions: (user) => dispatch(addUser(user)) }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInit);