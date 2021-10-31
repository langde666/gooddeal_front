import MainLayout from './MainLayout';
import VendorSideBar from './menu/VendorSideBar';

const VendorLayout = ({ children = null }) => (
    <MainLayout container="container" navFor='vendor'>
        <div className="vendor-manager-layout">
            <div className="row flex-nowrap position">
                <div className="col-3">
                    <VendorSideBar />
                </div>

                <div className="col-9">
                    {children}
                </div>
            </div>
        </div>

    </MainLayout>
);

export default VendorLayout;