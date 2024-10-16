import React, { useState, useEffect } from 'react';
import Table from '../Table/Table';
import config from '../../config';

function StockHistory() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  const columns = ['#', 'Quantity', 'Stock Name', 'Product', 'Stock Date'];

  useEffect(() => {
    fetchStock();
  });

  const fetchStock = async () => {
    try {
      const response = await fetch(`${config.BASE_URL}/stockHistory`);
      if (!response.ok) {
        setError('Failed to fetch stock History');
        return;
      }
      const stock = await response.json();


      const formattedData = stock.map(stockItem => {
        const stocksDate = new Date(stockItem.stock?.stockDate);
        const formattedStockDate = `${stocksDate.getFullYear()}-${String(stocksDate.getMonth() + 1).padStart(2, '0')}-${String(stocksDate.getDate()).padStart(2, '0')} ${String(stocksDate.getHours()).padStart(2, '0')}:${String(stocksDate.getMinutes()).padStart(2, '0')}`;

        return [
          stockItem.stockHistoryId,
          stockItem.stockHistoryQty,
          stockItem.stock?.stockName || "Unknown",
          stockItem.product?.productName || "Unknown",
          formattedStockDate
        ];
      });

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
            title={title}
            showButton={false}
            invoice={invoice}
          />
        )}
      </div>
    </div>
  )
}

export default StockHistory;
