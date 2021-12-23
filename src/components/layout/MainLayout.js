import MainNav from './menu/MainNav';
import Footer from './menu/Footer';

const MainLayout = ({
    container = 'container-lg',
    navFor = 'user',
    children = null,
}) => (
    <div className="main-layout">
        <MainNav navFor={navFor} />

        <main className={`body ${container}`}>{children}</main>

        <Footer />
    </div>
);

export default MainLayout;
