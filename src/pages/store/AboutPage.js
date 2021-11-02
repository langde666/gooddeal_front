import { useSelector } from 'react-redux';
import StoreLayout from '../../components/layout/StoreLayout';
import StoreProfileInfo from '../../components/info/StoreProfileInfo';
import StoreJoinedInfo from '../../components/info/StoreJoinedInfo';

const AboutPage = (props) => {
    const store = useSelector(state => state.store.store);
    return (
        <StoreLayout store={store}>
            <div className="store-about-page">
                <div className="">
                    <StoreProfileInfo store={store} />
                </div>

                <div className="mt-1">
                    <StoreJoinedInfo store={store} />
                </div>
            </div>
        </StoreLayout>
    );
}

export default AboutPage;