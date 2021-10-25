import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import VendorManagerLayour from '../../components/layout/VendorManagerLayour';
import AuthCover from "../../components/vendor/auth/AuthCover";
import AuthAvatar from "../../components/vendor/auth/AuthAvatar";
import AuthCarousel from "../../components/vendor/auth/AuthCarousel";
import StoreProfileGroup from "../../components/store/group/StoreProfileGroup";
import StoreLevelGroup from "../../components/store/group/StoreLevelGroup";
import StoreAccountGroup from "../../components/store/group/StoreAccountGroup";

const ShopProfilePage = (props) => {
    const store = useSelector(state => state.store.store);

    return (
        <VendorManagerLayour>
            <div className="shop-profile-page">
                <div className="row">
                    <div className="col-12 position-relative">
                        <AuthCover />
                        <div className="avatar-absolute avatar-absolute--store">
                            <AuthAvatar withVendor={false} isEditable={true} bodername={true} />
                        </div>
                    </div>

                    <div className="col-12 mt-2">
                        <AuthCarousel />
                    </div>

                    <div className="col-12 d-flex justify-content-end align-items-end mt-2">
                        <Link
                            className="btn btn-outline-primary ripple btn-sm"
                            to={`/store/${store._id}`} target="_blank"
                        >
                            Visit Your Shop <i className="fas fa-external-link-alt ms-1"></i>
                        </Link>
                    </div>

                    <div className="col-12 mt-4">
                        <div className="row">
                            <div className="col ms-2 me-1">
                                <StoreLevelGroup
                                    storeId={store._id}
                                    point={store.point}
                                    number_of_successful_orders={store.number_of_successful_orders}
                                    number_of_failed_orders={store.number_of_failed_orders}
                                    number_of_followers={store.number_of_followers}
                                />
                            </div>

                            <div className="col ms-1 me-2">
                                <StoreAccountGroup
                                    commissionId={store.commissionId}
                                    createdAt={store.createdAt}
                                />
                            </div>

                            <div className="col-12 mt-2">
                                <div className="row">
                                    <div className="col mx-2">
                                        <StoreProfileGroup
                                            storeId={store._id}
                                            name={store.name}
                                            bio={store.bio}
                                            isEditable={true}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </VendorManagerLayour>
    );

}

export default ShopProfilePage;