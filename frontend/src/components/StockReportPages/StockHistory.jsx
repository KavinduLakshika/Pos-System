import React, { useState, useEffect } from 'react'
import Table from '../Table/Table';
import config from '../../config';

function StockHistory() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  const columns = ['#', 'Name', 'Quantity', 'Stock Date', 'Stock Price', 'Product', 'Supplier', 'Store'];
  const btnName = 'Generate Report'

  useEffect(() => {
    fetchStock();
  }, []);

  const fetchStock = async () => {
    try {
      const response = await fetch(`${config.BASE_URL}/stocks`);
      if (!response.ok) {
        throw new Error('Failed to fetch stock list');
      }
      const stock = await response.json();
      const formattedData = stock.map(stock => [
        stock.stockId,
        stock.stockName,
        stock.stockQty,
        stock.stockDate,
        stock.stockPrice,
        stock.product?.productName || 'Unknown',
        stock.supplier?.supplierName || 'Unknown',
        stock.store?.storeName || "Unknown",
      ]);
      setData(formattedData);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const title='Stock History';
  const invoice='Stock History.pdf';

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
            columns={columns}
            btnName={btnName}
            showDelete={false}
            title={title}
            invoice={invoice}
          />
        )}
      </div>
    </div>
  )
}

export default StockHistory