import { useSelector } from 'react-redux';
import StoreLayout from '../../components/layout/StoreLayout';
import StoreProfileGroup from '../../components/store/group/StoreProfileGroup';
import StoreLevelGroup from '../../components/store/group/StoreLevelGroup';
import StoreAccountGroup from '../../components/store/group/StoreAccountGroup';

const StoreAboutPage = (props) => {
    const store = useSelector(state => state.storeVisit.store);
    return (
        <StoreLayout store={store}>
            <div className="row">
                <div className="col-12 px-4">
                    <StoreProfileGroup store={store} />
                </div>

                <div className="col-12 mt-1 px-4">
                    <StoreAccountGroup store={store} />
                </div>
            </div>
        </StoreLayout>
    );
}

export default StoreAboutPage;