import React from 'react';
import { useLocation } from 'react-router-dom';
import MainLayout from '../../components/layout/MainLayout';

const ProductSearchPage = (props) => {
    let location = useLocation();
    const search = location.search;
    const keyword = new URLSearchParams(search).get('keyword') || '';
    const price = new URLSearchParams(search).get('price') || 'all';

    return (
        <MainLayout>
            <div className="product-search-page">
                <h1>Product search</h1>
                <ul className="list-group">
                    <li className="list-group-item">Keyword: {keyword}</li>
                    <li className="list-group-item">Price: {price}</li>
                </ul>
            </div>
        </MainLayout>
    );
};

export default ProductSearchPage;
