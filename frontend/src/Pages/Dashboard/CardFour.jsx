import React, { useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Use Bootstrap for layout

const CardFour = ({ dataValues, labels }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        const data = {
            labels: labels, // Array of labels
            datasets: [
                {
                    label: 'Stock Distribution',
                    data: dataValues, // Array of values for the doughnut chart
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.5)',
                        'rgba(54, 162, 235, 0.5)',
                        'rgba(255, 206, 86, 0.5)',
                        'rgba(75, 192, 192, 0.5)',
                        'rgba(153, 102, 255, 0.5)',
                        'rgba(255, 159, 64, 0.5)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1,
                },
            ],
        };

        const config = {
            type: 'doughnut', // You can change this to 'pie' if you want a pie chart
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false, // Make the chart responsive
                plugins: {
                    legend: {
                        position: 'top', // Position of the legend
                    },
                    title: {
                        display: true,
                        text: 'Stock Distribution',
                    },
                },
            },
        };

        const myDoughnutChart = new window.Chart(chartRef.current, config);

        // Cleanup chart when component unmounts
        return () => {
            myDoughnutChart.destroy();
        };
    }, [dataValues, labels]);

    return (
        <div className="card bg-light mb-3 rounded-lg shadow-md relative me-3" style={{ height: '400px' }}>
            <div className="card-header">Stock Distribution Doughnut Chart</div>
            <div className="card-body">
                <div style={{ position: 'relative', height: '300px', width: '100%' }}>
                    <canvas ref={chartRef}></canvas>
                </div>
            </div>
        </div>
    );
};

export default CardFour;
