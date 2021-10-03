import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import Hello from '../components/HelloComponent/Hello';

const HomePage = () => {
    return (
        <MainLayout className="home-page">
            <Hello />
        </MainLayout>
    );
};

export default HomePage;
