import MainLayout from '../../components/layout/MainLayout';
import ListCategories from '../../components/list/ListCategories';
import ListBestSellerProduct from '../../components/list/ListBestSellerProduct';
import ListHotStores from '../../components/list/ListHotStores';

const HomePage = () => {
    return (
        <MainLayout container="container-lg" navFor="user">
            <div className="home-page">
                <div className="mb-4">
                    <ListCategories heading={true} />
                </div>

                <div className="mb-4">
                    <ListBestSellerProduct />
                </div>

                <div className="mb-4">
                    <ListHotStores heading={true} />
                </div>
            </div>
        </MainLayout>
    );
};

export default HomePage;
