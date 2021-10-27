import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addUserVisit } from '../../actions/userVisit';
import { getUser } from '../../apis/user';
import UserLayout from '../../components/layout/UserLayout';
import Loading from '../../components/ui/Loading';
import Error from '../../components/ui/Error';

const UserHomePage = (props) => {
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const user = useSelector(state => state.userVisit.user);
    const dispatch = useDispatch();
    const { userId } = useParams();

    const init = () => {
        setError('');
        setIsLoading(true);
        getUser(userId)
            .then(data => {
                if (data.error) {
                    setError(data.error);
                    setIsLoading(false);
                }
                else {
                    dispatch(addUserVisit(data.user));
                    setIsLoading(false);
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
        <UserLayout user={user}>
            {error && <Error msg={error} />}
            {isloading && <Loading />}
            {user && user.firstname + ' ' + user.lastname + ' home page...'}
        </UserLayout>
    );
}

export default UserHomePage;