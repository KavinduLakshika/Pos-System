import React, { useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Use Bootstrap for layout

const getRandomColor = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    const a = Math.random().toFixed(2);
    return `rgba(${r}, ${g}, ${b}, ${a})`;
};

const CardThree = ({ stockSize, labels }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        const data = {
            labels: labels,
            datasets: [
                {
                    label: 'Stock',
                    data: stockSize,
                    backgroundColor: getRandomColor(),
                    borderColor: getRandomColor(),
                    borderWidth: 1,
                },
            ],
        };

        const config = {
            type: 'bar',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        color: getRandomColor(),
                    },
                },
            },
        };

        const myBarChart = new window.Chart(chartRef.current, config);

        return () => {
            myBarChart.destroy();
        };
    }, [stockSize, labels]);

    return (
        <div className="bg-white mb-3" style={{ height: '400px' }}>
            <div className="card-header">Current Stock Bar Chart</div>
            <div className="card-body">
                <div style={{ position: 'relative', height: '400px', width: '100%' }}>
                    <canvas ref={chartRef}></canvas>
                </div>
            </div>
        </div>
    );
};

export default CardThree;
