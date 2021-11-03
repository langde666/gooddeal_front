import MainLayout from './MainLayout';
import UserNav from './menu/UserNav';
import Cover from '../image/Cover';
import Avatar from '../image/Avatar';
import UserLevelInfo from '../info/UserLevelInfo';

const UserLayout = ({ user = {}, children = null }) => (
    <MainLayout container="container">
        <div
            className="user-layout row"
            style={{ maxWidth: '990px', margin: '0 auto' }}
        >
            <div className="col-12 position-relative shadow">
                <Cover
                    cover={user.cover}
                    alt={user.firstname + ' ' + user.lastname}
                />
                <div className="avatar-absolute avatar-absolute--store">
                    <Avatar
                        avatar={user.avatar}
                        name={user && user.firstname + ' ' + user.lastname}
                        bodername={true}
                        alt={user.firstname + ' ' + user.lastname}
                    />
                </div>
                <div className="level-group-absolute level-group-absolute--small">
                    <UserLevelInfo user={user} />
                </div>
            </div>

            <UserNav user={user} />

            <div className="user-page-main mt-4">{children}</div>
        </div>
    </MainLayout>
);

export default UserLayout;
