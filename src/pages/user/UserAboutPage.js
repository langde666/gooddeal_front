import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addUserVisit } from '../../actions/userVisit';
import { getUser } from '../../apis/user';
import UserLayout from '../../components/layout/UserLayout';
import Loading from '../../components/ui/Loading';
import Error from '../../components/ui/Error';
import UserProfileGroup from '../../components/user/group/UserProfileGroup';
import UserLevelGroup from '../../components/user/group/UserLevelGroup';
import UserAccountGroup from '../../components/user/group/UserAccountGroup';

const UserAboutPage = (props) => {
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const { userId } = useParams();
    const user = useSelector(state => state.userVisit.user);
    const dispatch = useDispatch();

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
        if (!user || userId != user._id) init();
    }, [userId]);

    return (
        <UserLayout user={user}>
            {error && <Error msg={error} />}
            {isloading && <Loading />}

            {!error && !isloading &&
                <div className="row">
                    <div className="col ms-2 me-1">
                        <UserLevelGroup user={user} />
                    </div>

                    <div className="col ms-1 me-2">
                        <UserAccountGroup user={user} />
                    </div>

                    <div className="col-12 mt-2">
                        <div className="row">
                            <div className="col mx-2">
                                <UserProfileGroup user={user} />
                            </div>
                        </div>
                    </div>
                </div>
            }
        </UserLayout>
    );
}

export default UserAboutPage;