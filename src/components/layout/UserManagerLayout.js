import MainLayout from './MainLayout';
import UserSideBar from './nav/UserSideBar';

const UserManagerLayout = ({ children = null }) => (
    <MainLayout container="container">
        <div className="user-manager-page">
            <div className="row flex-nowrap">
                <div className="col-3">
                    <UserSideBar />
                </div>

                <div className="col-9">
                    {children}
                </div>
            </div>
        </div>

    </MainLayout>
);

export default UserManagerLayout;