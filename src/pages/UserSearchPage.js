import React from 'react';
import { useLocation } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';

const UserSearchPage = (props) => {
    let location = useLocation();
    const search = location.search;
    const keyword = new URLSearchParams(search).get('keyword') || '';

    return (
        <MainLayout className="user-search-page">
            <h1>User search</h1>
            <ul className="list-group">
                <li className="list-group-item">Keyword: {keyword}</li>
            </ul>
        </MainLayout>
    );
};

export default UserSearchPage;