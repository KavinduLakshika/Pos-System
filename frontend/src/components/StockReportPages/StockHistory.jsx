import React, { useState, useEffect } from 'react'
import Table from '../Table/Table';
import config from '../../config';

function StockHistory() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  const columns = ['#', 'Name', 'Quantity', 'Stock Date', 'Stock Price', 'Product', 'Supplier', 'Store', 'Status'];
  const btnName = 'Generate Report'

  useEffect(() => {
    fetchStock();
  });

  const fetchStock = async () => {
    try {
      const response = await fetch(`${config.BASE_URL}/stocks`);
      if (!response.ok) {
        throw new Error('Failed to fetch stock list');
      }
      const stock = await response.json();

      // Filter out items where stockStatus is "Out of Stock"
      const inStockItems = stock.filter(stock => stock.stockStatus !== "In stock");

      const formattedData = inStockItems.map(stock => [
        stock.stockId,
        stock.stockName,
        stock.stockQty,
        stock.stockDate,
        stock.stockPrice,
        stock.product?.productName || 'Unknown',
        stock.supplier?.supplierName || 'Unknown',
        stock.store?.storeName || "Unknown",
        <select
          className='form-control'
          value={stock.stockStatus}
          onChange={(e) => handleStatusChange(stock.stockId, e.target.value)}
        >
          <option value="In stock">In stock</option>
          <option value="Out of Stock">Out of Stock</option>
        </select>
      ]);
      setData(formattedData);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };
  const handleStatusChange = async (stockId, newStatus) => {
    try {
      const response = await fetch(`${config.BASE_URL}/stock/${stockId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ stockStatus: newStatus }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to update stock status: ${response.status} ${response.statusText}. ${errorData.message || ''}`);
      }
      await fetchStock();
    } catch (error) {
      setError(`Error updating stock status: ${error.message}`);
    }
  };
  const handleDelete = async (rowIndex) => {
    try {
      const stockId = data[rowIndex][0];
      const response = await fetch(`${config.BASE_URL}/stock/${stockId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to delete stock: ${response.status} ${response.statusText}. ${errorData.message || ''}`);
      }

      setData(prevData => prevData.filter((_, index) => index !== rowIndex));
      await fetchStock();
    } catch (err) {
      setError(`Error deleting stock: ${err.message}`);
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
            columns={columns}
            btnName={btnName}
            onDelete={handleDelete}
            title={title}
            invoice={invoice}
          />
        )}
      </div>
    </div>
  )
}

export default StockHistory