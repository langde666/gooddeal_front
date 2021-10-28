import MainLayout from './MainLayout';
import Cover from '../../components/ui/Cover';
import Avatar from '../../components/ui/Avatar';
import AuthStoreLevelGroup from '../../components/store/auth/AuthStoreLevelGroup';
import StoreVisitNav from '../../components/layout/nav/StoreVisitNav';

const StoreLayout = ({ store = {}, children = null }) => (
    <MainLayout container="container">
        <div className="store-page row" style={{ maxWidth: '990px', margin: '0 auto' }}>
            <div className="col-12 position-relative shadow">
                <Cover cover={store.cover} />
                <div className="avatar-absolute avatar-absolute--store">
                    <Avatar
                        avatar={store.avatar}
                        name={store.name}
                        bodername={true}
                    />
                </div>
                <div className="level-group-absolute">
                    <AuthStoreLevelGroup />
                </div>
            </div>

            <StoreVisitNav storeId={store._id} />

            <div className="store-page-main mt-4">
                {children}
            </div>
        </div>
    </MainLayout>
);

export default StoreLayout;