import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import StoreLayout from '../../components/layout/StoreLayout';

const StoreProductsPage = (props) => {
    const store = useSelector(state => state.storeVisit.store);
    const keyword = new URLSearchParams(useLocation().search).get('keyword') || '';

    return (
        <StoreLayout store={store}>
            {store && store.name + ' products page...'}
            <div className="">
                Keyword: '{keyword || ' '}'
            </div>
        </StoreLayout>
    );
}

export default StoreProductsPage;