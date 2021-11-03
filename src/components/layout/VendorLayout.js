import MainLayout from './MainLayout';
import VendorSideBar from './menu/VendorSideBar';

const VendorLayout = ({ user = {}, store = {}, children = null }) => (
    <MainLayout container="container" navFor="vendor">
        <div className="vendor-manager-layout">
            <div className="row flex-nowrap position">
                <div className="col-3">
                    <VendorSideBar user={user} store={store} />
                </div>

                <div className="col-9">{children}</div>
            </div>
        </div>
    </MainLayout>
);

export default VendorLayout;
