import MainLayout from './MainLayout';
import Cover from '../../components/ui/Cover';
import Avatar from '../../components/ui/Avatar';
import StoreVisitNav from '../../components/layout/nav/StoreVisitNav';

const StoreLayout = ({ store, children }) => (
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
            </div>

            <StoreVisitNav
                avatar={store && store.avatar}
                name={store && store.name}
                storeId={store._id}
            />

            <div className="store-page mt-4 p-3 shadow rounded">
                {children}
            </div>
        </div>
    </MainLayout>
);

export default StoreLayout;