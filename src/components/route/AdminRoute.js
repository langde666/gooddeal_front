import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getToken } from '../../apis/auth';

const AdminRoute = ({ component: Page, ...rest }) => {
    const role = useSelector(state => state.user.user.role);

    return <Route
        {...rest}
        render={(props) =>
            getToken() && role == 'admin' ? (
                <Page {...props} />
            ) : (
                <Redirect
                    to={{
                        pathname: '/',
                        state: { from: props.location },
                    }}
                />
            )
        }
    />
}

export default AdminRoute;