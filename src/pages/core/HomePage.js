import MainLayout from '../../components/layout/MainLayout';
import ListCategories from '../../components/list/ListCategories';
import ListBestSellerProduct from '../../components/list/ListBestSellerProduct';
import ListHotStores from '../../components/list/ListHotStores';

const HomePage = () => {
    return (
        <MainLayout container="container" navFor="user">
            <div className="home-page">
                <div className="mb-4">
                    <ListCategories heading={true} col="col" limit={5} />
                </div>

                <div className="mb-4">
                    <ListBestSellerProduct col="col" limit={5} />
                </div>

                <div className="mb-4">
                    <ListHotStores heading={true} col="col" limit={5} />
                </div>
            </div>
        </MainLayout>
    );
};

export default HomePage;
