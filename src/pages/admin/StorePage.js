import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getToken } from '../../apis/auth';
import { listStoresForAdmin } from '../../apis/store';
import { groupByJoined } from '../../helper/groupBy';
import useToggle from '../../hooks/useToggle';
import AdminLayout from '../../components/layout/AdminLayout';
import AdminStoresTable from '../../components/table/AdminStoresTable';
import Loading from '../../components/ui/Loading';
import Error from '../../components/ui/Error';
import DropDownMenu from '../../components/ui/DropDownMenu';
import LineChart from '../../components/chart/LineChart';
import BarChart from '../../components/chart/BarChart';
import DoughnutChart from '../../components/chart/DoughnutChart';

const StorePage = (props) => {
    const user = useSelector((state) => state.account.user);
    const [flag, toggleFlag] = useToggle(true);

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
        listStoresForAdmin(_id, accessToken, {
            search: '',
            sortBy: 'createdAt',
            sortMoreBy: '',
            isActive: '',
            order: 'desc',
            limit: 1000,
            page: 1,
        })
            .then((data) => {
                if (data.error) setError(data.error);
                else setItems(data.stores.reverse());
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
            <div className="admin-stores-manager-page position-relative">
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
                            title="Statistics of new stores"
                        />
                    )}
                    {options.type === 'bar' && (
                        <BarChart
                            by={options.by}
                            items={items}
                            groupBy={groupByJoined}
                            title="Statistics of new stores"
                        />
                    )}
                    {options.type === 'doughnut' && (
                        <DoughnutChart
                            by={options.by}
                            items={items}
                            groupBy={groupByJoined}
                            title="Statistics of new stores"
                        />
                    )}
                </div>

                <div className="d-flex align-items-center mb-2 mt-4">
                    <div className="position-relative d-inline-block me-2">
                        <button
                            type="button"
                            className={`btn ${
                                flag ? 'btn-primary' : 'btn-outline-primary'
                            } btn-lg ripple cus-tooltip`}
                            onClick={() => toggleFlag(true)}
                        >
                            <i className="fas fa-check-circle"></i>
                        </button>

                        <small className="cus-tooltip-msg">
                            Liscensed stores
                        </small>
                    </div>

                    <div className="position-relative d-inline-block">
                        <button
                            type="button"
                            className={`btn ${
                                !flag ? 'btn-danger' : 'btn-outline-danger'
                            } btn-lg ripple cus-tooltip`}
                            onClick={() => toggleFlag(false)}
                        >
                            <i className="fas fa-times-circle"></i>
                        </button>

                        <small className="cus-tooltip-msg">Banned stores</small>
                    </div>
                </div>

                <AdminStoresTable isActive={flag} />
            </div>
        </AdminLayout>
    );
};

export default StorePage;
