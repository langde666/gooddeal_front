import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getToken } from '../../apis/auth';
import { useParams } from 'react-router-dom';
import { listOrdersByStore } from '../../apis/order';
import { groupByDate } from '../../helper/groupBy';
import LineChart from '../../components/chart/LineChart';
import BarChart from '../../components/chart/BarChart';
import DoughnutChart from '../../components/chart/DoughnutChart';
import DropDownMenu from '../../components/ui/DropDownMenu';
import Loading from '../../components/ui/Loading';
import Error from '../../components/ui/Error';
import VendorLayout from '../../components/layout/VendorLayout';

const DashboardPage = (props) => {
    const user = useSelector((state) => state.account.user);
    const store = useSelector((state) => state.vendor.store);

    const { storeId } = useParams();

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
        listOrdersByStore(
            _id,
            accessToken,
            {
                limit: 1000,
                sortBy: 'createdAt',
                order: 'desc',
                page: 1,
                status: 'Delivered',
            },
            storeId,
        )
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
    }, [storeId]);

    return (
        <VendorLayout user={user} store={store}>
            <div className="vendor-dashboard-page position-relative">
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
                            role="vendor"
                            groupBy={groupByDate}
                        />
                    )}
                    {options.type === 'bar' && (
                        <BarChart
                            by={options.by}
                            items={items}
                            role="vendor"
                            groupBy={groupByDate}
                        />
                    )}
                    {options.type === 'doughnut' && (
                        <DoughnutChart
                            by={options.by}
                            items={items}
                            role="vendor"
                            groupBy={groupByDate}
                        />
                    )}
                </div>
            </div>
        </VendorLayout>
    );
};

export default DashboardPage;
