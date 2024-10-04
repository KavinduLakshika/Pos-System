import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import CardOne from './CardOne';
import CardTwo from './CardTwo';
import CardThree from './CardThree';
import CardFour from './CardFour';
import config from '../../config';

const Dashboard = () => {
  const base_url = config.BASE_URL;

  const [reportData, setReportData] = useState({
    TodayTotal: "0",
    YesterdayTotal: "0",
    ThisMonthTotal: '0',
    LastMonthTotal: '0',
    todayTotalSales: [],
    monthTotalSales: [],
  });
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch(`${base_url}/getReports`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setReportData(data.message);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchReports();
  }, [base_url]);

  //card three bar chart stock
  const lables = ['Ring', 'Neckless', 'Bangle', 'Earing']
  const stockSize = [65, 59, 80, 81, 56, 55];

  //Card Four doughnut pie chart
  const stockDistribution = [65, 59, 80, 81, 56];
  const productLabels = ['Ring', 'Necklace', 'Bangle', 'Earring', 'Bracelet'];


  return (
    <div className="scrolling-container">
    <div className="container-fluid my-4">
      <h1 className="h2 mb-4">Dashboard</h1>

      <div className="row">
        <div className="col-lg-3 col-md-12 mb-4">

          <div className="h-100">
            <CardOne
              TodayTotal={reportData.revenueToday}
              YesterdayTotal={reportData.revenueYesterday}
              ThisMonthTotal={reportData.revenueMonth}
              LastMonthTotal={reportData.revenueLastMonth}
              todayTotalSales={reportData.salesToday}
              monthTotalSales={reportData.salesMonth}
            />
          </div>
        </div>

        <div className="col-lg-9 col-md-12 mb-4">
          <div className="h-100">
            <CardTwo
              monthlyRevenue={reportData.monthlyRevenue}
              monthlySales={reportData.monthTotalSales}
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
    </div>
  );
};

export default Dashboard;
