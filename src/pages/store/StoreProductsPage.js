import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addStoreVisit } from '../../actions/storeVisit';
import { getStore } from '../../apis/store';
import StoreLayout from '../../components/layout/StoreLayout';
import Loading from '../../components/ui/Loading';
import Error from '../../components/ui/Error';

const StoreProductsPage = (props) => {
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const { storeId } = useParams();
    const store = useSelector(state => state.storeVisit.store);
    const dispatch = useDispatch();
    const keyword = new URLSearchParams(useLocation().search).get('keyword') || '';

    const init = () => {
        setIsLoading(true);
        setError('');
        getStore(storeId)
            .then(data => {
                if (data.error) {
                    setError(data.error);
                    setIsLoading(false);
                }
                else {
                    dispatch(addStoreVisit(data.store));
                    setIsLoading(false);
                }
            })
            .catch(error => {
                setError('Server Error');
                setIsLoading(false);
            });
    }

    useEffect(() => {
        if (!store || store._id != storeId) init();
    }, [storeId]);

    return (
        <StoreLayout store={store}>
            {error && <Error msg={error} />}
            {isloading && <Loading />}
            {store && store.name + ' products page...'}
            <div className="">
                Keyword: '{keyword || ' '}'
            </div>
        </StoreLayout>
    );
}

export default StoreProductsPage;