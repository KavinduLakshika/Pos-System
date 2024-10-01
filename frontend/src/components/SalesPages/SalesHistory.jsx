import { useEffect, useState } from "react";
import Table from '../Table/Table';
import config from '../../config'

const SalesHistory = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const columns = ["ID", "Date/time", "Due Date", "Paid Amount", "Payable Amount", "Due Amount", "Total Amount", "Discount", "Invoice Note", "Customer", "Products"];

  const btnName = 'Add New Sale'

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
        invoice.invoiceNote,
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

  return (
    <div>
      <div className="scrolling-container">
        <div className="new-sales-container">
          <h4>SalesHistory</h4>
          <div>
            <Table
              data={data}
              columns={columns}
              btnName={btnName}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SalesHistory