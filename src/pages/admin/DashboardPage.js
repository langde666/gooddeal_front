import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getToken } from '../../apis/auth';
import { listOrdersForAdmin } from '../../apis/order';
import AdminLayout from '../../components/layout/AdminLayout';
import LineChart from '../../components/chart/LineChart';
import BarChart from '../../components/chart/BarChart';
import DoughnutChart from '../../components/chart/DoughnutChart';
import DropDownMenu from '../../components/ui/DropDownMenu';
import Loading from '../../components/ui/Loading';
import Error from '../../components/ui/Error';

const DashboardPage = (props) => {
    const user = useSelector((state) => state.account.user);

    const [isloading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const [items, setItems] = useState([]);
    const [options, setOptions] = useState({
        by: 'hours',
        type: 'line',
    });

    const init = () => {
        setError('');
        setIsLoading(true);
        const { _id, accessToken } = getToken();
        listOrdersForAdmin(_id, accessToken, {
            limit: 1000,
            sortBy: 'createdAt',
            order: 'desc',
            page: 1,
            status: 'Delivered',
        })
            .then((data) => {
                if (data.error) setError(data.error);
                else setItems(data.orders.reverse());
                setIsLoading(false);
            })
            .catch((error) => {
                setError('Server Error');
                setIsLoading(false);
            });
    };

    useEffect(() => {
        init();
    }, []);

    return (
        <AdminLayout user={user}>
            <div className="admin-dashboard-page position-relative">
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
                        <LineChart by={options.by} items={items} />
                    )}
                    {options.type === 'bar' && (
                        <BarChart by={options.by} items={items} />
                    )}
                    {options.type === 'doughnut' && (
                        <DoughnutChart by={options.by} items={items} />
                    )}
                </div>
            </div>
        </AdminLayout>
    );
};

export default DashboardPage;
