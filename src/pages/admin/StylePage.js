import { useSelector } from 'react-redux';
import AdminLayout from '../../components/layout/AdminLayout';
import AdminStylesTable from '../../components/table/AdminStylesTable';

const StylePage = (props) => {
    const user = useSelector((state) => state.account.user);
    return (
        <AdminLayout user={user}>
            <div className="admin-styles-manager-page">
                <AdminStylesTable />
            </div>
        </AdminLayout>
    );
};

export default StylePage;
