import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import AdminLayout from '../../components/layout/AdminLayout';
import AdminEditCategoryForm from '../../components/item/form/AdminEditCategoryForm';

const EditCategoryPage = (props) => {
    const user = useSelector((state) => state.account.user);
    const { categoryId } = useParams();
    return (
        <AdminLayout user={user}>
            <div className="admin-create-category-page">
                <AdminEditCategoryForm categoryId={categoryId} />
            </div>
        </AdminLayout>
    );
};

export default EditCategoryPage;
