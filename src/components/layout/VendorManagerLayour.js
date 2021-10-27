import MainLayout from './MainLayout';
import VendorSideBar from './nav/VendorSideBar';

const VendorManagerLayout = ({ children = null }) => (
    <MainLayout container="container" navFor='vendor'>
        <div className="vendor-manager-page">
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

export default VendorManagerLayout;