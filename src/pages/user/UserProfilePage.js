import { useSelector, useDispatch } from 'react-redux';
import MainLayout from '../../components/layout/MainLayout';

const UserProfilePage = () => {
    const userRedux = useSelector((state) => state.user.user);
    // const dispatch = useDispatch();

    return (
        <MainLayout className="user-profile-page">
            <ul className="list-group m-4">
                <li className="list-group-item">
                    Name: {userRedux.firstname + ' ' + userRedux.lastname}
                </li>
                <li className="list-group-item">Email: {userRedux.email}</li>
                <li className="list-group-item">Phone: {userRedux.phone}</li>
                <li className="list-group-item">
                    ID card: {userRedux.id_card}
                </li>
                <li className="list-group-item">Role: {userRedux.role}</li>
            </ul>
        </MainLayout>
    );
};

export default UserProfilePage;
