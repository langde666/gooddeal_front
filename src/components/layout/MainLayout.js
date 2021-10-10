import MainNav from './nav/MainNav';
import './style.css';

const MainLayout = ({ children = null }) => {
    return (
        <div className="main-layout">
            <MainNav />

            <main className="body container">
                {children}
            </main>

            {/* <footer className="bg-primary mt-4" style={{ height: '50vh', display: 'block' }}>
                footer
            </footer> */}
        </div>
    );
};

export default MainLayout;
