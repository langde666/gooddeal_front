import { useSelector } from 'react-redux';
import StoreLayout from '../../components/layout/StoreLayout';
import StoreProfileGroup from '../../components/store/group/StoreProfileGroup';
import StoreAccountGroup from '../../components/store/group/StoreAccountGroup';

const AboutPage = (props) => {
    const store = useSelector(state => state.store.store);
    return (
        <StoreLayout store={store}>
            <div className="store-about-page row">
                <div className="col-12 px-3">
                    <StoreProfileGroup store={store} />
                </div>

                <div className="col-12 mt-1 px-3">
                    <StoreAccountGroup store={store} />
                </div>
            </div>
        </StoreLayout>
    );
}

export default AboutPage;