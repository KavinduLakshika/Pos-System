import React, { useEffect, useRef } from 'react';
import './Dashboard.css';

function CardTwo({ JanTotal, FebTotal, MarTotal, AprTotal, JunTotal }) {
    const chartRef = useRef(null);

    useEffect(() => {
        const data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'],
            datasets: [
                {
                    label: 'Sales Earnings',
                    data: [
                        JanTotal, 
                        FebTotal, 
                        MarTotal, 
                        AprTotal, 
                        JunTotal,
                        0, 
                        0, 
                        0, 
                        0, 
                        0, 
                        0, 
                        0 ], 
                    fill: false,
                    backgroundColor: 'rgba(75, 192, 192, 1)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    tension: 0.1,
                },
            ],
        };

        const config = {
            type: 'line',
            data: data,
            options: {
                responsive: true,
                maintainAspectRatio: false, // Allow the chart to scale properly
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        // text: 'Total Sales Earnings Over Time',
                    },
                },
            },
        };

        // Create the chart
        const myChart = new window.Chart(chartRef.current, config);

        // Cleanup function to destroy the chart instance when component unmounts
        return () => {
            myChart.destroy();
        };
    }, [JanTotal, FebTotal, MarTotal, AprTotal, JunTotal]);

    return (
        <div className="chart-container card bg-light mb-3 rounded-lg shadow-md relative cardTwo" > 
            <div className="card-header">Total Sales Earnings Over Time</div>
            <div className="row">
                <div className="col">
                    <canvas ref={chartRef}></canvas>
                </div>
            </div>
        </div>
    );
}

export default CardTwo;
