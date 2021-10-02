import React from 'react';
import Nav from '../NavComponent/Nav';
import './style.css';

const MainLayout = ({ className = null, children = null }) => {
    return (
        <div className="main-layout">
            <Nav />

            <div className="body container">
                <div className={className}>{children}</div>
            </div>
        </div>
    )
}

export default MainLayout;