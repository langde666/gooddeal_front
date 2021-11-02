import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import VendorLayout from '../../components/layout/VendorLayout';

const ProfilePage = (props) => {
    const store = useSelector(state => state.vendor.store);

    return (
        <VendorLayout>
            <div className="vendor-profile-page">
                <div className="row">
                    <div className="col-12 position-relative">
                        {/* <AuthCover /> */}
                        <div className="avatar-absolute avatar-absolute--store">
                            {/* <AuthAvatar withVendor={false} isEditable={true} bodername={true} hasisOpen={true} /> */}
                        </div>
                        <div className="level-group-absolute">
                            {/* <AuthStoreLevelGroup /> */}
                        </div>
                    </div>

                    <div className="col-12 mt-2">
                        {/* <AuthCarousel /> */}
                    </div>

                    <div className="col-12 d-flex justify-content-end align-items-end mt-2">
                        <Link
                            className="btn btn-outline-primary ripple btn-sm"
                            to={`/store/${store._id}`} target="_blank"
                        >
                            Visit Your Shop <i className="fas fa-external-link-alt ms-1"></i>
                        </Link>
                    </div>

                    <div className="col-12 mt-4 px-4">
                        {/* <StoreProfileGroup store={store} isEditable={true} /> */}
                    </div>

                    <div className="col-12 mt-1 px-4">
                        {/* <StoreAccountGroup store={store} /> */}
                    </div>
                </div>
            </div>
        </VendorLayout>
    );
}

export default ProfilePage;