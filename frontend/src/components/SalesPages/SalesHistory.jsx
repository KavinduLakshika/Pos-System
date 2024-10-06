import { useEffect, useState } from "react";
import Table from '../Table/Table';
import config from '../../config';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const SalesHistory = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const columns = ["ID", "Date/time", "Due Date", "Paid Amount", "Payable Amount", "Due Amount", "Total Amount", "Discount", "Customer", "Products"];
  const btnName = 'Add New Sale';

  useEffect(() => {
    fetchSalesHistory();
  }, []);

  const fetchSalesHistory = async () => {
    try {
      const response = await fetch(`${config.BASE_URL}/invoices`);
      if (!response.ok) {
        throw new Error('Failed to fetch Sales Invoices');
      }
      const invoice = await response.json();
      const formattedData = invoice.map(invoice => [
        invoice.invoiceId,
        invoice.invoiceDate,
        invoice.invoiceDueDate,
        invoice.paidAmount,
        invoice.payableAmount,
        invoice.dueAmount,
        invoice.totalAmount,
        invoice.discount,
        invoice.customer?.cusName || "Unknown",
        invoice.product?.productName || "Unknown"
      ]);
      setData(formattedData);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const resetFilters = () => {
    setStartDate(null);
    setEndDate(null);
  };

  return (
    <div>
      <div className="scrolling-container">
        <div className="new-sales-container">
          <h4>Sales History</h4>
          <div className="d-flex mb-2">
            <div className="me-2">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                placeholderText="Start Date"
                className="form-control"
                dateFormat="yyyy-MM-dd"
              />
            </div>
            <div className="me-2">
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                placeholderText="End Date"
                className="form-control"
                dateFormat="yyyy-MM-dd"
              />
            </div>
            <button className="btn btn-danger" onClick={resetFilters}>Reset</button>
          </div>
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : (
            <Table
              data={data}
              columns={columns}
              btnName={btnName}
              startDate={startDate}
              endDate={endDate}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SalesHistory;
