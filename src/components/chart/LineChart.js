import { useState, useEffect } from 'react';
import { groupByDate } from '../../helper/groupBy';
import { randomColor } from '../../helper/color';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const LineChart = ({
    by = 'hours',
    items = [],
    role = 'admin',
    groupBy = groupByDate,
}) => {
    const [data, setData] = useState({
        labels: [],
        datasets: [],
    });

    const init = () => {
        const newData = groupBy(items, by, role);
        setData({
            labels: Object.keys(newData),
            datasets: [
                {
                    data: Object.values(newData),
                    label: `sales statistics by ${by}`,
                    borderColor: randomColor(),
                    fill: false,
                },
            ],
        });
    };

    useEffect(() => {
        init();
    }, [items, by, role]);

    return (
        <div className="line-chart">
            <Line
                data={data}
                options={{
                    title: {
                        display: true,
                        text: `Sales statistics by ${by}`,
                    },
                    legend: {
                        display: true,
                        position: 'bottom',
                    },
                }}
            />
        </div>
    );
};

export default LineChart;