import { useSelector } from 'react-redux';
import StoreLayout from '../../components/layout/StoreLayout';
import StoreProfileInfo from '../../components/info/StoreProfileInfo';
import StoreJoinedInfo from '../../components/info/StoreJoinedInfo';
import MainLayout from '../../components/layout/MainLayout';
import Error from '../../components/ui/Error';

const AboutPage = (props) => {
    const store = useSelector((state) => state.store.store);
    return typeof store.isActive === 'boolean' && !store.isActive ? (
        <MainLayout>
            <Error msg="This store is banned by GoodDeal!" />
        </MainLayout>
    ) : (
        <StoreLayout store={store}>
            <div
                className="store-about-page"
                style={{ maxWidth: '990px', margin: '0 auto' }}
            >
                <div className="">
                    <StoreProfileInfo store={store} />
                </div>

                <div className="mt-1">
                    <StoreJoinedInfo store={store} />
                </div>
            </div>
        </StoreLayout>
    );
};

export default AboutPage;
