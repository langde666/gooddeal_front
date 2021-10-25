import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
    const [user, setUser] = useState({});
    const { userId } = useParams();

    const init = () => {
        setIsLoading(true);

        getUser(userId)
            .then(data => {
                if (data.error) {
                    setError(data.error);
                    setIsLoading(false);
                }
                else {
                    setUser(data.user);
                    setIsLoading(false);
                }
            })
            .catch(error => {
                setError('Server Error');
                setIsLoading(false);
            });
    }

    useEffect(() => {
        init();
    }, []);

    return (
        <UserLayout user={user}>
            {error && <Error msg={error} />}
            {isloading && <Loading />}
            {!error && !isloading &&
                <div className="row">
                    <div className="col ms-2 me-1">
                        <UserLevelGroup
                            userId={user._id}
                            point={user.point}
                            number_of_successful_orders={user.number_of_successful_orders} number_of_failed_orders={user.number_of_failed_orders}
                        />
                    </div>

                    <div className="col ms-1 me-2">
                        <UserAccountGroup
                            role={user.role}
                            createdAt={user.createdAt}
                        />
                    </div>

                    <div className="col-12 mt-2">
                        <div className="row">
                            <div className="col mx-2">
                                <UserProfileGroup
                                    firstname={user.firstname}
                                    lastname={user.lastname}
                                    id_card={user.id_card}
                                    email={user.email}
                                    phone={user.phone}
                                    isEmailActive={user.isEmailActive}
                                    isPhoneActive={user.isPhoneActive}
                                    googleId={user.googleId}
                                    facebookId={user.facebookId}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            }
        </UserLayout>
    );
}

export default UserAboutPage;