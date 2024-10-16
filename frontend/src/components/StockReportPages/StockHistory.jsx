import React, { useState, useEffect } from 'react'
import Table from '../Table/Table';
import config from '../../config';

function StockHistory() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  const columns = ['#', 'Quantity', 'Stock Name', 'Product'];
  const btnName = 'Generate Report'

  useEffect(() => {
    fetchStock();
  });

  const fetchStock = async () => {
    try {
      const response = await fetch(`${config.BASE_URL}/stockHistory`);
      if (!response.ok) {
        setError('Failed to fetch stock History');
      }
      const stock = await response.json();

      const formattedData = stock.map(stock => [
        stock.stockHistoryId,
        stock.stockHistoryQty,
        stock.stock?.stockName || "Unknown",
        stock.product?.productName || "Unknown",
      ]);
      setData(formattedData);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const title = 'Stock History';
  const invoice = 'Stock History.pdf';

  return (
    <div>
      <div className="scrolling-container">
        <h4>Stock History</h4>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <Table
            search={'Search by Product Name'}
            data={data}
            showActions={false}
            columns={columns}
            btnName={btnName}
            title={title}
            invoice={invoice}
          />
        )}
      </div>
    </div>
  )
}

export default StockHistory;