import React, { useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Use Bootstrap for layout

const CardThree = ({ stockSize,lables }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        const data = {
            labels: lables,
            datasets: [
                {
                    label: 'Stock',
                    data: stockSize, // Use the data passed as props
                    backgroundColor: 'rgba(75, 192, 192, 0.5)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                },
            ],
        };

        const config = {
            type: 'bar',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false, // Allow the chart to scale properly
                scales: {
                    y: {
                        beginAtZero: true, // Ensure Y axis starts at zero
                    },
                },
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Stock',
                    },
                },
            },
        };

        const myBarChart = new window.Chart(chartRef.current, config);

        // Cleanup chart when component unmounts
        return () => {
            myBarChart.destroy();
        };
    }, [stockSize]);

    return (
        <div className=" bg-white mb-3 " style={{ height: '400px' }}>
            <div className="card-header">Current Stock Bar Chart</div>
            <div className="card-body">
                <div style={{ position: 'relative', height: '300px', width: '100%' }}>
                    <canvas ref={chartRef}></canvas>
                </div>
            </div>
        </div>
    );
};

export default CardThree;
