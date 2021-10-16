import MainLayout from './MainLayout';
import VendorSideBar from './nav/VendorSideBar';

const VendorManagerLayout = ({ children }) => {
    return (
        <MainLayout container="container" navFor='vendor'>
            <div className="vendor-manager-page">
                <div className="row flex-nowrap position">
                    <div className="col-3">
                        <VendorSideBar />
                    </div>

                    <div className="col-9 p-3 shadow rounded">
                        {children}
                    </div>
                </div>
            </div>

        </MainLayout>
    );
};

export default VendorManagerLayout;