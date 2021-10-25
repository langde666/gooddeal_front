import MainLayout from './MainLayout';
import Cover from '../../components/ui/Cover';
import Avatar from '../../components/ui/Avatar';
import UserVisitNav from '../../components/layout/nav/UserVisitNav';

const UserLayout = ({ user, children }) => (
    <MainLayout container="container">
        <div className="user-page row" style={{ maxWidth: '990px', margin: '0 auto' }}>
            <div className="col-12 position-relative shadow">
                <Cover cover={user.cover} />
                <div className="avatar-absolute avatar-absolute--store">
                    <Avatar
                        avatar={user.avatar}
                        name={user && user.firstname + ' ' + user.lastname}
                        bodername={true}
                    />
                </div>
            </div>

            <UserVisitNav
                avatar={user && user.avatar}
                name={user && user.firstname + ' ' + user.lastname}
                userId={user._id}
            />

            <div className="user-page mt-4 p-3 shadow rounded">
                {children}
            </div>
        </div>
    </MainLayout>
);

export default UserLayout;