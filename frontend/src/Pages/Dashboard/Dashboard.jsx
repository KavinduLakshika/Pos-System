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
    monthlyRevenue: [],
    monthlySales: [],
  });

  const [stockSize, setStockSize] = useState([]);
  const [labels, setLabels] = useState([]);

  // Fetch report data
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

  // Fetch stock data
  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await fetch(`${base_url}/productStock`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const result = await response.json();

        if (result.message_type === "success") {
          const stock = result.message;
          const stockLabels = stock.map(item => item['product.productName']);
          const stockQty = stock.map(item => item.totalQty);

          setLabels(stockLabels);
          setStockSize(stockQty);
        }
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    fetchStockData();
  }, [base_url]);

  
  const stockDistribution = [65, 59, 80, 81];
  const productLabels = ['Expenses', 'Supplier Payments', 'Salaray Payment', 'Income'];

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
                monthlySales={reportData.monthlySales}
              />
            </div>
          </div>
        </div>

        <div className='row'>
          <div className="col-lg-6 col-sm-12">
            <CardThree
              stockSize={stockSize}
              labels={labels}
            />
          </div>
          <div className="col-lg-6 col-sm-12">
            <CardFour
              dataValues={stockDistribution}
              labels={productLabels}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
