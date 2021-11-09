import { useSelector } from 'react-redux';
import AdminLayout from '../../components/layout/AdminLayout';
import AdminCategoriesTable from '../../components/table/AdminCategoriesTable';

const CategoryPage = (props) => {
    const user = useSelector((state) => state.account.user);
    return (
        <AdminLayout user={user}>
            <div className="admin-categories-manager-page">
                <AdminCategoriesTable />
            </div>
        </AdminLayout>
    );
};

export default CategoryPage;
