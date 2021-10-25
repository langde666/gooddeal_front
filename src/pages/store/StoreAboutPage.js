import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addStoreVisit } from '../../actions/storeVisit';
import { getStore } from '../../apis/store';
import StoreLayout from '../../components/layout/StoreLayout';
import Loading from '../../components/ui/Loading';
import Error from '../../components/ui/Error';
import StoreProfileGroup from '../../components/store/group/StoreProfileGroup';
import StoreLevelGroup from '../../components/store/group/StoreLevelGroup';
import StoreAccountGroup from '../../components/store/group/StoreAccountGroup';

const StoreAboutPage = (props) => {
    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [store, setStore] = useState({});
    let storeVisit = useSelector(state => state.storeVisit.store);
    const dispatch = useDispatch();
    const { storeId } = useParams();

    const init = () => {
        setIsLoading(true);

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
        if (!storeVisit || storeVisit._id != storeId) {
            init();
        }
        else {
            setStore(storeVisit);
        }

    }, [storeId, storeVisit]);

    return (
        <StoreLayout store={store}>
            {error && <Error msg={error} />}
            {isloading && <Loading />}
            {!error && !isloading &&
                <div className="row">
                    <div className="col ms-2 me-1">
                        <StoreLevelGroup
                            storeId={store._id}
                            point={store.point}
                            number_of_successful_orders={store.number_of_successful_orders}
                            number_of_failed_orders={store.number_of_failed_orders}
                            number_of_followers={store.number_of_followers}
                        />
                    </div>

                    <div className="col ms-1 me-2">
                        <StoreAccountGroup
                            commissionId={store.commissionId}
                            createdAt={store.createdAt}
                        />
                    </div>

                    <div className="col-12 mt-2">
                        <div className="row">
                            <div className="col mx-2">
                                <StoreProfileGroup
                                    storeId={store._id}
                                    name={store.name}
                                    bio={store.bio}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            }
        </StoreLayout>
    );
}

export default StoreAboutPage;