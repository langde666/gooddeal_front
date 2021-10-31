import { useSelector } from 'react-redux';
import StoreLayout from '../../components/layout/StoreLayout';

const HomePage = (props) => {
    const store = useSelector(state => state.store.store);
    return (
        <StoreLayout store={store}>
            <div className="store-home-page">
                {store && store.name + ' home page...'}
            </div>
        </StoreLayout>
    );
}

export default HomePage;