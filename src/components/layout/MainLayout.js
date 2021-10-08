import MainNav from './nav/MainNav';
import './style.css';

const MainLayout = ({ className = null, children = null }) => {
    return (
        <div className="main-layout">
            <MainNav />

            <div className="body container">
                <div className={className}>{children}</div>
            </div>
        </div>
    );
};

export default MainLayout;
