import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import CardOne from './CardOne';
import CardTwo from './CardTwo';
import CardThree from './CardThree';
import CardFour from './CardFour';

const Dashboard = () => {

  //card one total price
  const TodayTotal = 'Rs. 10,000';
  const YesterdayTotal = 'Rs. 10,000';
  const ThisMonthTotal = 'Rs. 10,000';
  const LastMonthTotal = 'Rs. 10,000';

  //card two line chart 
  const JanTotal = 65;
  const FebTotal = 59;
  const MarTotal = 89;
  const AprTotal = 81;
  const JunTotal = 55;

  //card three bar chart stock
  const lables = ['Ring', 'Neckless', 'Bangle', 'Earing']
  const stockSize = [65, 59, 80, 81, 56, 55];

  //Card Four doughnut pie chart
  const stockDistribution = [65, 59, 80, 81, 56];
  const productLabels = ['Ring', 'Necklace', 'Bangle', 'Earring', 'Bracelet'];


  return (
    <div className="container-fluid my-4">
      <h1 className="h2 mb-4">Dashboard</h1>

      <div className="row">
        <div className="col-lg-3 col-md-12 mb-4">

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

      <div className='row'>
        <div className="col-lg-6 col-sm-12 ">
          <CardThree
            stockSize={stockSize}
            lables={lables} />
        </div>

        <div className="col-lg-6 col-sm-12 ">

          <CardFour
            dataValues={stockDistribution}
            labels={productLabels} />

        </div>

      </div>


    </div>
  );
};

export default Dashboard;
