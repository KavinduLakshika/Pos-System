import React, { useEffect, useRef } from 'react';
import './Dashboard.css';

function CardTwo({JanTotal, FebTotal, MarTotal, AprTotal, JunTotal}) {

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

        // Create the chart
        const myChart = new window.Chart(chartRef.current, {
            type: 'line',
            data: data,
            options: {
                responsive: true,
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
        });

        
        return () => {
            myChart.destroy();
        };
    }, []);

    return (
        <div>
            <div>
                <div className="card bg-light mb-3 rounded-lg shadow-md relative cardTwo">
                    <div className="card-header">Total Sales Earnings Over Time</div>
                    <div className="row">
                        <div className="col">
                            <canvas ref={chartRef}></canvas> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CardTwo;
