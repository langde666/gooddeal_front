import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import AdminLayout from '../../components/layout/AdminLayout';
import AdminEditStyleForm from '../../components/item/form/AdminEditStyleForm';

const EditStylePage = (props) => {
    const user = useSelector((state) => state.account.user);
    const { styleId } = useParams();
    return (
        <AdminLayout user={user}>
            <div className="admin-edit-style-page">
                <AdminEditStyleForm styleId={styleId} />
            </div>
        </AdminLayout>
    );
};

export default EditStylePage;
