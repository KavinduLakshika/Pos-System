import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
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
    <div className="container-fluid my-4">
      <h1 className="h2 mb-4">Dashboard</h1>

      <div className="row">
        <div className="col-lg-3 col-md-12 mb-4">
          {/* CardOne takes up 3 columns on large screens, full width on small */}
          <div className="h-100">
            <CardOne
              TodayTotal={TodayTotal}
              YesterdayTotal={YesterdayTotal}
              ThisMonthTotal={ThisMonthTotal}
              LastMonthTotal={LastMonthTotal}
            />
          </div>
        </div>

        <div className="col-lg-9 col-md-12 mb-4">
          {/* CardTwo takes up 9 columns on large screens, full width on small */}
          <div className="h-100">
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
    </div>
  );
};

export default Dashboard;
