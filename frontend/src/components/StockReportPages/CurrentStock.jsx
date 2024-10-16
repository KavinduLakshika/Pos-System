import { useState, useEffect } from 'react';
import Table from '../../components/Table/Table';
import { useNavigate } from 'react-router-dom';
import config from '../../config';

function CurrentStock() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);
  const columns = ['#', 'Category', 'Product Name', 'Name', 'Quantity', 'Status' , 'Action'];
  const btnName = '+ New Stock';

  useEffect(() => {
    fetchStock();
  },);

  const fetchStock = async () => {
    try {
      const response = await fetch(`${config.BASE_URL}/stocks`);
      if (!response.ok) {
        throw new Error('Failed to fetch stock list');
      }
      const stock = await response.json();

      const updatedStock = await Promise.all(stock.map(async (item) => {
        if (item.product?.productQty === 0 && item.stockStatus !== 'Out of Stock') {
          await handleStatusChange(item.stockId, 'Out of Stock');
          return { ...item, stockStatus: 'Out of Stock' };
        }
        return item;
      }));

      // Filter out "Out of Stock" items
      const inStockItems = updatedStock.filter(item => item.stockStatus !== 'Out of Stock');

      const formattedData = inStockItems.map(stock => [
        stock.stockId,
        stock.category?.categoryName || "Unknown",
        stock.product?.productName || 'Unknown',
        stock.product?.productUnit || 'Unknown',
        stock.stockName,
        stock.stockQty,
        stock.stockDate,
        stock.stockPrice,
        stock.mfd,
        stock.exp,
        stock.stockDescription,
        stock.supplier?.supplierName || 'Unknown',
        stock.store?.storeName || "Unknown",
        <select
          className='form-control'
          value={stock.stockStatus}
          onChange={(e) => handleStatusChange(stock.stockId, e.target.value)}
          disabled={stock.stockQty === 0}
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
      // Fetch the current stock item to get all its details
      const stockResponse = await fetch(`${config.BASE_URL}/stock/${stockId}`);
      if (!stockResponse.ok) {
        throw new Error(`Failed to fetch stock details: ${stockResponse.status} ${stockResponse.statusText}`);
      }
      const stockItem = await stockResponse.json();

      // Prepare the update payload
      const updatePayload = {
        ...stockItem,
        stockStatus: newStatus,
        stockQty: newStatus === 'Out of Stock' ? 0 : stockItem.stockQty
      };

      // Send the update request
      const response = await fetch(`${config.BASE_URL}/stock/${stockId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatePayload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to update stock status: ${response.status} ${response.statusText}. ${errorData.message || ''}`);
      }

      // Refetch the stock data to update the UI
      await fetchStock();
    } catch (error) {
      setError(`Error updating stock status: ${error.message}`);
    }
  };

  const navigate = useNavigate();

  const handleNewStockClick = () => {
    navigate('/stock/new-stock');
  };

  const title = 'Current Stock';
  const invoice = 'Current Stock.pdf';

  return (
    <div>
      <div className="scrolling-container">
        <h4>Current Stock</h4>
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
            onAdd={handleNewStockClick}
            showDelete={false}
            onMarkOutOfStock={null}
            title={title}
            invoice={invoice}
          />
        )}
      </div>
    </div>
  )
}

export default CurrentStock;