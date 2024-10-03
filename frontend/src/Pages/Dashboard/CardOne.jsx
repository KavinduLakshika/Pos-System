import React from 'react';

function CardOne({ TodayTotal, YesterdayTotal, ThisMonthTotal, LastMonthTotal }) {
  return (
    <div className="card h-100">
      <div className="card-header">Total Sales Earnings</div>
      <div className="card-body">
        <div className="row">
          <div className="col-6">
            <h5 className="card-title">Today</h5>
            <p className="card-text">{TodayTotal}</p>
          </div>
          <div className="col-6">
            <h5 className="card-title">This Month</h5>
            <p className="card-text">{ThisMonthTotal}</p>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-6">
            <h5 className="card-title">Yesterday</h5>
            <p className="card-text">{YesterdayTotal}</p>
          </div>
          <div className="col-6">
            <h5 className="card-title">Last Month</h5>
            <p className="card-text">{LastMonthTotal}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardOne;
