import { useLocation } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';

const StoreSearchPage = (props) => {
    let location = useLocation();
    const search = location.search;
    const keyword = new URLSearchParams(search).get('keyword') || '';
    const star = new URLSearchParams(search).get('star') || 'all';

    return (
        <MainLayout className="store-search-page">
            <h1>Store search</h1>
            <ul className="list-group">
                <li className="list-group-item">Keyword: {keyword}</li>
                <li className="list-group-item">Star: {star}</li>
            </ul>
        </MainLayout>
    );
};

export default StoreSearchPage;
