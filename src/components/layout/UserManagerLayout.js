import MainLayout from './MainLayout';
import UserSideBar from './nav/UserSideBar';

const UserManagerLayout = ({ children }) => {

    return (
        <MainLayout className="user-account-page">
            <div className="row flex-nowrap position">
                <div className="col-3">
                    <UserSideBar />
                </div>

                <div className="col-9 p-3 shadow mb-5 bg-body rounded">
                    {children}
                </div>
            </div>
        </MainLayout>
    );
};

export default UserManagerLayout;