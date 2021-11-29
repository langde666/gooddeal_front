import { useState, useEffect } from 'react';
import { groupByDate } from '../../helper/groupBy';
import { randomColorsArray } from '../../helper/color';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const BarChart = ({
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
                    backgroundColor: randomColorsArray(
                        Object.values(newData).length,
                    ),
                },
            ],
        });
    };

    useEffect(() => {
        init();
    }, [items, by]);

    return (
        <div className="bar-chart">
            <Bar
                data={data}
                options={{
                    legend: { display: false },
                    title: {
                        display: true,
                        text: `Sales statistics by ${by}`,
                    },
                }}
            />
        </div>
    );
};

export default BarChart;
