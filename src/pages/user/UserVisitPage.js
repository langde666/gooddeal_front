import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUser } from '../../apis/user';
import MainLayout from '../../components/layout/MainLayout';
import Loading from '../../components/ui/Loading';
import Error from '../../components/ui/Error';
import Cover from '../../components/ui/Cover';
import Avatar from '../../components/ui/Avatar';
import UserProfileVisit from '../../components/ui/UserProfileVisit';
import UserAmountOrderVisit from '../../components/ui/UserAmountOrderVisit';
import UserAccountInfoVisit from '../../components/ui/UserAccountInfoVisit';

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
            <div className="user-visit-page position-relative p-3 shadow rounded"
                style={{ maxWidth: '990px', margin: '0 auto' }}>
                {isloading && <Loading />}
                {error && <Error msg={error} />}
                {user && (
                    <div className="row">
                        <div className="col-12 position-relative pb-1">
                            <Cover cover={user.cover} />
                            <div className="avatar-absolute">
                                <Avatar
                                    avatar={user.avatar}
                                    firstname={user.firstname}
                                    lastname={user.lastname}
                                />
                            </div>
                            <div className="d-flex justify-content-end mt-4 me-2">
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
                        </div>

                        <div className="col-12 mt-4">
                            <div className="row">
                                <div className="col mx-1">
                                    <UserProfileVisit
                                        firstname={user.firstname}
                                        lastname={user.lastname}
                                        email={user.email}
                                        phone={user.phone}
                                        id_card={user.id_card}
                                    />
                                </div>

                                <div className="col mx-1">
                                    <div className="row">
                                        <div className="col-12">
                                            <UserAmountOrderVisit
                                                userId={user._id}
                                                point={user.point}
                                                number_of_successful_orders={user.number_of_successful_orders} number_of_failed_orders={user.number_of_failed_orders}
                                            />
                                        </div>
                                        <div className="col-12 mt-2">
                                            <UserAccountInfoVisit
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
            </div>
        </MainLayout>
    );
}

export default UserVisitPage;