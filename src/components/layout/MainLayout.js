import MainNav from './nav/MainNav';
import './style.css';

const MainLayout = ({ children = null, container = "container", typeLogo = 'user', navFor = 'user' }) => {
    return (
        <div className="main-layout">
            <MainNav typeLogo={typeLogo} navFor={navFor} />

            <main className={`body ${container}`}>
                {children}
            </main>

            {/* <footer className="bg-primary mt-4" style={{ height: '50vh', display: 'block' }}>
                footer
            </footer> */}
        </div>
    );
};

export default MainLayout;
