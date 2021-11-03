import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import VendorLayout from '../../components/layout/VendorLayout';
import Cover from '../../components/image/Cover';
import Avatar from '../../components/image/Avatar';
import Carousel from '../../components/image/Carousel';
import StoreAddFeaturedImageItem from '../../components/item/StoreAddFeaturedImageItem';
import StoreStatusLabel from '../../components/label/StoreStatusLabel';
import StoreLevelInfo from '../../components/info/StoreLevelInfo';
import StoreJoinedInfo from '../../components/info/StoreJoinedInfo';
import StoreProfileInfo from '../../components/info/StoreProfileInfo';

const ProfilePage = (props) => {
    const user = useSelector((state) => state.account.user);
    const store = useSelector((state) => state.vendor.store);
    return (
        <VendorLayout user={user} store={store}>
            <div className="vendor-profile-page">
                <div className="position-relative">
                    <Cover
                        cover={store.cover}
                        alt={store.name}
                        isEditable="store"
                        storeId={store._id}
                    />

                    <div className="avatar-absolute avatar-absolute--store">
                        <Avatar
                            avatar={store.avatar}
                            alt={store.name}
                            name={
                                <span className="d-inline-flex justify-content-center align-items-center">
                                    {store.name}
                                    <small className="ms-2">
                                        <StoreStatusLabel
                                            isOpen={store.isOpen}
                                        />
                                    </small>
                                </span>
                            }
                            bodername={true}
                            isEditable="store"
                            storeId={store._id}
                        />
                    </div>

                    <div className="level-group-absolute">
                        <StoreLevelInfo store={store} />
                    </div>
                </div>

                <div className="mt-2">
                    <Carousel
                        listImages={store.featured_images}
                        alt={store.name}
                        isEditable="store"
                        storeId={store._id}
                    />
                </div>

                <div className="d-flex justify-content-end mt-2">
                    <div className="me-1">
                        <StoreAddFeaturedImageItem
                            count={
                                store.featured_images &&
                                store.featured_images.length
                            }
                            storeId={store._id}
                        />
                    </div>

                    <Link
                        className="btn btn-outline-primary ripple btn-sm"
                        to={`/store/${store._id}`}
                        target="_blank"
                    >
                        Visit Your Shop{' '}
                        <i className="fas fa-external-link-alt ms-1"></i>
                    </Link>
                </div>

                <div className="mt-4 px-2">
                    <StoreProfileInfo store={store} isEditable={true} />
                </div>

                <div className="mt-1 px-2">
                    <StoreJoinedInfo store={store} />
                </div>
            </div>
        </VendorLayout>
    );
};

export default ProfilePage;
