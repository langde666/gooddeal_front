import { useSelector } from 'react-redux';
import StoreLayout from '../../components/layout/StoreLayout';

const StoreHomePage = (props) => {
    const store = useSelector(state => state.storeVisit.store);
    return (
        <StoreLayout store={store}>
            {store && store.name + ' home page...'}
        </StoreLayout>
    );
}

export default StoreHomePage;