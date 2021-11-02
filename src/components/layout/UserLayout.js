import MainLayout from './MainLayout';
import UserNav from './menu/UserNav';
import Cover from '../../components/ui/Cover';
import Avatar from '../../components/ui/Avatar';
import UserLevelInfo from '../../components/info/UserLevelInfo';

const UserLayout = ({ user = {}, children = null }) => (
    <MainLayout container="container">
        <div className="user-layout row" style={{ maxWidth: '990px', margin: '0 auto' }}>
            <div className="col-12 position-relative shadow">
                <Cover cover={user.cover} />
                <div className="avatar-absolute avatar-absolute--store">
                    <Avatar
                        avatar={user.avatar}
                        name={user && user.firstname + ' ' + user.lastname}
                        bodername={true}
                    />
                </div>
                <div className="level-group-absolute level-group-absolute--small">
                    <UserLevelInfo user={user} />
                </div>
            </div>

            <UserNav user={user} />

            <div className="user-page-main mt-4">
                {children}
            </div>
        </div>
    </MainLayout>
);

export default UserLayout;