import MainNav from './menu/MainNav';

const MainLayout = ({
    container = 'container-lg',
    navFor = 'user',
    children = null,
}) => (
    <div className="main-layout">
        <MainNav navFor={navFor} />

        <main className={`body ${container}`}>{children}</main>

        {/* <footer className="bg-primary mt-4" style={{ height: '50vh', display: 'block' }}>
                footer
            </footer> */}
    </div>
);

export default MainLayout;
