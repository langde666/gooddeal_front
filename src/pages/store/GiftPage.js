import { useSelector } from 'react-redux';
import StoreLayout from '../../components/layout/StoreLayout';

const GiftPage = (props) => {
    const store = useSelector((state) => state.store.store);
    return (
        <StoreLayout store={store}>
            <div className="store-gift-page">
                {store && store.name + ' gift page...'}
            </div>
        </StoreLayout>
    );
};

export default GiftPage;
