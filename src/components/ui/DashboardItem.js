import { Link } from 'react-router-dom';

const DashboardItem = (props) => {
    return (
        <div className="dashboard-item-wrap position-relative">
            <Link
                className="btn btn-outline-light cus-outline ripple cus-tooltip"
                to="/">
                <i className="fas fa-user-tie"></i>
            </Link>
            <small className="cus-tooltip-msg">Dashboard</small>
        </div>

    )
}

export default DashboardItem;