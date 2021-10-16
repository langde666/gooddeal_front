import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUser } from '../../apis/user';
import MainLayout from '../../components/layout/MainLayout';
import Loading from '../../components/ui/Loading';
import Error from '../../components/ui/Error';
import Cover from '../../components/ui/Cover';
import Avatar from '../../components/ui/Avatar';
import UserProfileGroup from '../../components/user/group/UserProfileGroup';
import UserLevelGroup from '../../components/user/group/UserLevelGroup';
import UserAccountGroup from '../../components/user/group/UserAccountGroup';

const UserVisitPage = (props) => {
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
        <MainLayout>
            {error && <Error msg={error} />}
            {!error && <div className="user-visit-page position-relative p-3 shadow rounded"
                style={{ maxWidth: '990px', margin: '0 auto' }}>
                {isloading && <Loading />}
                {user && (
                    <div className="row">
                        <div className="col-12 position-relative">
                            <Cover cover={user.cover} />
                            <div className="avatar-absolute avatar-absolute--store">
                                <Avatar
                                    avatar={user.avatar}
                                    firstname={user.firstname}
                                    lastname={user.lastname}
                                    bodername={true}
                                />
                            </div>
                        </div>

                        <div className="col-12 d-flex justify-content-end mt-2">
                            <div className="position-relative d-inline-block">
                                <div className="temp cus-tooltip">
                                    <button
                                        disabled
                                        className="btn btn-outline-pink ripple btn-sm"
                                    >
                                        <i className="far fa-heart me-2"></i>Follow
                                        {/* <i className="fas fa-heart me-2"></i>Following */}
                                    </button>
                                </div>

                                <small className="cus-tooltip-msg">This function is not available yet</small>
                            </div>
                        </div>

                        <div className="col-12 mt-4">
                            <div className="row">
                                <div className="col ms-2 me-1">
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

                                <div className="col ms-1 me-2">
                                    <div className="row">
                                        <div className="col-12">
                                            <UserLevelGroup
                                                userId={user._id}
                                                point={user.point}
                                                number_of_successful_orders={user.number_of_successful_orders} number_of_failed_orders={user.number_of_failed_orders}
                                            />
                                        </div>
                                        <div className="col-12 mt-2">
                                            <UserAccountGroup
                                                role={user.role}
                                                createdAt={user.createdAt}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>}
        </MainLayout>
    );
}

export default UserVisitPage;