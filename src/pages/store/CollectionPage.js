import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import StoreLayout from '../../components/layout/StoreLayout';

const CollectionPage = (props) => {
    const store = useSelector((state) => state.store.store);
    const keyword =
        new URLSearchParams(useLocation().search).get('keyword') || '';

    return (
        <StoreLayout store={store}>
            <div className="store-collection-page">
                {store && store.name + ' products page...'}
                Keyword: '{keyword || ' '}'
            </div>
        </StoreLayout>
    );
};

export default CollectionPage;
