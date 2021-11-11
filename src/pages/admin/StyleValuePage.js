import { useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import AdminLayout from '../../components/layout/AdminLayout';
import AdminStyleValuesTable from '../../components/table/AdminStyleValuesTable';

const StyleValuesPage = (props) => {
    const user = useSelector((state) => state.account.user);
    const { styleId } = useParams();
    return (
        <AdminLayout user={user}>
            <div className="admin-style-values-manager-page">
                <AdminStyleValuesTable styleId={styleId} />

                <div className="mt-4">
                    <Link
                        to="/admin/style"
                        className="text-decoration-none cus-link-hover"
                    >
                        <i className="fas fa-arrow-circle-left"></i> Back to
                        Style Manager
                    </Link>
                </div>
            </div>
        </AdminLayout>
    );
};

export default StyleValuesPage;
