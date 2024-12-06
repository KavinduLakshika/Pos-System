import { useEffect, useState } from "react";
import Table from '../Table/Table';
import config from '../../config';
import 'react-datepicker/dist/react-datepicker.css';

const SalesHistory = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const columns = ["ID", "Date/time", "Total Amount", "Customer"];
  const btnName = 'Add New Sale';

  useEffect(() => {
    fetchSalesHistory();
  }, []);
  const fetchSalesHistory = async () => {
    try {
      const response = await fetch(`${config.BASE_URL}/invoices`);
      if (!response.ok) {
        setError('Failed to fetch Sales Invoices');
        return;
      }
      const invoices = await response.json();
  
      // Fetch transaction data for each invoice if required (assuming there is a relationship)
      const transactionPromises = invoices.map(async (invoice) => {
        const transactionResponse = await fetch(`${config.BASE_URL}/transaction/invoice/${invoice.invoiceId}`);
        if (transactionResponse.ok) {
          return await transactionResponse.json();
        }
        return [];
      });
  
      // Wait for all transaction data to be fetched
      const transactionsData = await Promise.all(transactionPromises);
  
      const formattedData = invoices.map((invoice, index) => {
        const invoiceDate = new Date(invoice.invoiceDate);
        
        // Format dates to "YYYY-MM-DD HH:mm"
        const formattedInvoiceDate = `${invoiceDate.getFullYear()}-${String(invoiceDate.getMonth() + 1).padStart(2, '0')}-${String(invoiceDate.getDate()).padStart(2, '0')} ${String(invoiceDate.getHours()).padStart(2, '0')}:${String(invoiceDate.getMinutes()).padStart(2, '0')}`;
  
        // Assuming transactionsData[index] contains the transaction for this invoice
        const transactionPrice = transactionsData[index]?.reduce((total, transaction) => total + transaction.price, 0)  ;
  
        return [
          invoice.invoiceId,
          formattedInvoiceDate,
          transactionPrice, 
          invoice.customer?.cusName || "Unknown",
        ];
      });
  
      setData(formattedData);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };
  
  const title = 'Sales History';
  const invoice = 'Sales History.pdf';

  return (
    <div>
      <div className="scrolling-container">
        <div className="new-sales-container">
          <h4>Sales History</h4>

          {isLoading ? (
            <p>Loading...</p>
            // ) : error ? (
            //   <p>Error: {error}</p>
          ) : (
            <Table
              data={data}
              columns={columns}
              btnName={btnName}
              title={title}
              invoice={invoice}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SalesHistory;
