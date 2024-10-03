import React from 'react';

function CardOne({ TodayTotal, YesterdayTotal, ThisMonthTotal, LastMonthTotal }) {
  return (
    <div className="card">
      <div className="card-header">Total Sales Earnings</div>
      <div className="card-body">
        <div className="earnings-grid">
          <div className="earning-item">
            <h5>Today</h5>
            <p>{TodayTotal}</p>
          </div>
          <div className="earning-item">
            <h5>This Month</h5>
            <p>{ThisMonthTotal}</p>
          </div>
          <div className="earning-item">
            <h5>Yesterday</h5>
            <p>{YesterdayTotal}</p>
          </div>
          <div className="earning-item">
            <h5>Last Month</h5>
            <p>{LastMonthTotal}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardOne;
