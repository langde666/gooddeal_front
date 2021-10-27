import MainLayout from './MainLayout';
import AdminSideBar from './nav/AdminSideBar';

const AdminManagerLayout = ({ children = null }) => (
    <MainLayout container="container" navFor='admin'>
        <div className="admin-manager-page">
            <div className="row flex-nowrap position">
                <div className="col-3">
                    <AdminSideBar />
                </div>

                <div className="col-9">
                    {children}
                </div>
            </div>
        </div>
    </MainLayout>
);

export default AdminManagerLayout;