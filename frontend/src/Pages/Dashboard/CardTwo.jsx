import React, { useEffect, useRef } from 'react';

function CardTwo({ JanTotal, FebTotal, MarTotal, AprTotal, MayTotal, JunTotal, JulTotal, AugTotal, SepTotal, OctTotal, NovTotal, DecTotal }) {
  const chartRef = useRef(null);

  useEffect(() => {
    const data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [
        {
          label: 'Sales Earnings',
          data: [JanTotal, FebTotal, MarTotal, AprTotal, MayTotal, JunTotal, JulTotal, AugTotal, SepTotal, OctTotal, NovTotal, DecTotal],
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
        maintainAspectRatio: false,
      },
    };

    const myChart = new window.Chart(chartRef.current, config);

    return () => {
      myChart.destroy();
    };
  }, [JanTotal, FebTotal, MarTotal, AprTotal, JunTotal]);

  return (
    <div className="card h-100 me-3">
      <div className="card-header">Total Sales Earnings Over Time</div>
      <div className="card-body">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
}

export default CardTwo;
