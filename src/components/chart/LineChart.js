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
            labels: newData.reduce((labels, currentData) => [...labels, currentData[0]], []),
            datasets: [
                {
                    data: newData.reduce((datas, currentData) => [...datas, currentData[1]], []),
                    label: title,
                    borderColor: randomColor(),
                    fill: false,
                },
            ],
        });
    };

    useEffect(() => {
        init();
    }, [items, by, role, sliceEnd]);

    return (
        <Line
            data={data}
            options={{
                title: {
                    display: true,
                    text: title,
                },
                legend: {
                    display: true,
                    position: 'bottom',
                },
            }}
        />
    );
};

export default LineChart;
