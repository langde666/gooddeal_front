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
    title = 'Sales statistics',
    sliceEnd = 6,
}) => {
    const [data, setData] = useState({
        labels: [],
        datasets: [],
    });

    const init = () => {
        const newData = groupBy(items, by, role, sliceEnd);
        setData({
            labels: Object.keys(newData),
            datasets: [
                {
                    data: Object.values(newData),
                    label: title,
                    backgroundColor: randomColorsArray(
                        Object.values(newData).length,
                    ),
                },
            ],
        });
    };

    useEffect(() => {
        init();
    }, [items, by, role, sliceEnd]);

    return (
        <Bar
            data={data}
            options={{
                legend: { display: false },
                title: {
                    display: true,
                    text: title,
                },
            }}
        />
    );
};

export default BarChart;
