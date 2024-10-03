import React from 'react';
import './Dashboard.css';
import CardOne from './CardOne';
import CardTwo from './CardTwo';

const Dashboard = () => {

  const TodayTotal = 'Rs. 10,000';
  const YesterdayTotal = 'Rs. 10,000';
  const ThisMonthTotal = 'Rs. 10,000';
  const LastMonthTotal = 'Rs. 10,000';

  const JanTotal = 65;
  const FebTotal = 59;
  const MarTotal = 89;
  const AprTotal = 81;
  const JunTotal = 55;

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>

      <div className="grid-container">
        <div className="card-item">
          <CardOne 
            TodayTotal={TodayTotal}
            YesterdayTotal={YesterdayTotal}
            ThisMonthTotal={ThisMonthTotal}
            LastMonthTotal={LastMonthTotal}
          />
        </div>

        <div className="card-item-wide">
          <CardTwo 
            JanTotal={JanTotal}
            FebTotal={FebTotal}
            MarTotal={MarTotal}
            AprTotal={AprTotal}
            JunTotal={JunTotal}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
