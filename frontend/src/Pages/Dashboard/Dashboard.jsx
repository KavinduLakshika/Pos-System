import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Dashboard.css'
import CardOne from './CardOne';
import CardTwo from './CardTwo';


const Dashboard = () => {

  const TodayTotal = 'Rs. 10,000';
  const YesterdayTotal = 'Rs. 10,000';
  const ThisMonthTotal = 'Rs. 10,000';
  const LastMonthTotal = 'Rs. 10,000';

  const  JanTotal = 65;
  const  FebTotal =59;
  const  MarTotal = 89;
  const  AprTotal = 81;
  const  JunTotal = 55;

  return (
    <div className="d-flex">
      <main style={{ padding: '20px' }}>
        <h1 className="h2 mb-4">Dashboard</h1>

        <div className='d-flex'>

          <div className="me-3"> 
            <CardOne 
            TodayTotal={TodayTotal}
            YesterdayTotal={YesterdayTotal}
            ThisMonthTotal={ThisMonthTotal}
            LastMonthTotal={LastMonthTotal}/>

          </div>

          <div className="me-3"> 
            <CardTwo 
            JanTotal={JanTotal}
            FebTotal={FebTotal}
            MarTotal={MarTotal}
            AprTotal={AprTotal}
            JunTotal={JunTotal}
            />
            
          </div>

        </div>






      </main>

    </div>
  );
};

export default Dashboard;