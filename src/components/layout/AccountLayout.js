import MainLayout from './MainLayout';
import AccountSideBar from './menu/AccountSideBar';

const AccountLayout = ({ children = null }) => (
    <MainLayout container="container">
        <div className="account-manager-layout">
            <div className="row flex-nowrap">
                <div className="col-3">
                    <AccountSideBar />
                </div>

                <div className="col-9">
                    {children}
                </div>
            </div>
        </div>

    </MainLayout>
);

export default AccountLayout;