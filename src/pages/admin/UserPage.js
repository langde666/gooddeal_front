import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getToken } from '../../apis/auth';
import { listUserForAdmin } from '../../apis/user';
import { groupByJoined } from '../../helper/groupBy';
import AdminLayout from '../../components/layout/AdminLayout';
import AdminUsersTable from '../../components/table/AdminUsersTable';
import Loading from '../../components/ui/Loading';
import Error from '../../components/ui/Error';
import DropDownMenu from '../../components/ui/DropDownMenu';
import LineChart from '../../components/chart/LineChart';
import BarChart from '../../components/chart/BarChart';
import DoughnutChart from '../../components/chart/DoughnutChart';

const UserPage = (props) => {
    const user = useSelector((state) => state.account.user);

    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const [items, setItems] = useState([]);
    const [options, setOptions] = useState({
        by: 'hours',
        type: 'line',
    });

    const init = () => {
        const { _id, accessToken } = getToken();
        setError('');
        setIsLoading(true);
        listUserForAdmin(_id, accessToken, {
            search: '',
            sortBy: 'createdAt',
            order: 'desc',
            limit: 1000,
            page: 1,
            role: 'user',
        })
            .then((data) => {
                if (data.error) setError(data.error);
                else setItems(data.users.reverse());
                setIsLoading(false);
            })
            .catch((error) => {
                setError(error);
                setIsLoading(false);
            });
    };

    useEffect(() => {
        init();
    }, []);

    return (
        <AdminLayout user={user}>
            <div className="position-relative">
                {isloading && <Loading />}
                {error && <Error msg={error} />}

                <form className="ms-4 d-flex">
                    <div className="me-4">
                        <DropDownMenu
                            listItem={[
                                {
                                    label: 'Hour',
                                    value: 'hours',
                                    icon: <i className="far fa-clock"></i>,
                                },
                                {
                                    label: 'Day',
                                    value: 'date',
                                    icon: (
                                        <i className="fas fa-calendar-day"></i>
                                    ),
                                },
                                {
                                    label: 'Month',
                                    value: 'month',
                                    icon: (
                                        <i className="fas fa-calendar-alt"></i>
                                    ),
                                },
                                {
                                    label: 'Year',
                                    value: 'year',
                                    icon: (
                                        <i className="fas fa-calendar-minus"></i>
                                    ),
                                },
                            ]}
                            value={options.by}
                            setValue={(value) =>
                                setOptions({
                                    ...options,
                                    by: value,
                                })
                            }
                            label="Statistics by"
                            borderBtn={true}
                        />
                    </div>
                    <div>
                        <DropDownMenu
                            listItem={[
                                {
                                    label: 'Line',
                                    value: 'line',
                                    icon: <i className="fas fa-chart-line"></i>,
                                },
                                {
                                    label: 'Bar',
                                    value: 'bar',
                                    icon: <i className="fas fa-chart-bar"></i>,
                                },
                                {
                                    label: 'Doughnut',
                                    value: 'doughnut',
                                    icon: <i className="fas fa-chart-pie"></i>,
                                },
                            ]}
                            value={options.type}
                            setValue={(value) =>
                                setOptions({
                                    ...options,
                                    type: value,
                                })
                            }
                            label="Chart type"
                            borderBtn={true}
                        />
                    </div>
                </form>

                <div className="mt-4">
                    {options.type === 'line' && (
                        <LineChart
                            by={options.by}
                            items={items}
                            groupBy={groupByJoined}
                            title="Statistics of new users"
                        />
                    )}
                    {options.type === 'bar' && (
                        <BarChart
                            by={options.by}
                            items={items}
                            groupBy={groupByJoined}
                            title="Statistics of new users"
                        />
                    )}
                    {options.type === 'doughnut' && (
                        <DoughnutChart
                            by={options.by}
                            items={items}
                            groupBy={groupByJoined}
                            title="Statistics of new users"
                        />
                    )}
                </div>

                <div className="mt-4">
                    <AdminUsersTable heading={false} />
                </div>
            </div>
        </AdminLayout>
    );
};

export default UserPage;
