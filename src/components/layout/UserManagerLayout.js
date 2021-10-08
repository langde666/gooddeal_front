import MainLayout from './MainLayout';
import UserSideBar from './nav/UserSideBar';

const UserManagerLayout = ({ children }) => {

    return (
        <MainLayout className="user-account-page">
            <div className="row flex-nowrap">
                <div className="col">
                    <UserSideBar />
                </div>

                <div className="col-9">
                    {children}
                </div>
            </div>
        </MainLayout>
    );
};

export default UserManagerLayout;