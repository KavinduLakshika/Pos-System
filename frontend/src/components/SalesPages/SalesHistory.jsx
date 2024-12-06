import { useEffect, useState } from "react";
import Table from '../Table/Table';
import config from '../../config';
import 'react-datepicker/dist/react-datepicker.css';

const SalesHistory = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const columns = ["ID" ,"Customer", "Date/time","Transaction Type", "Total Amount","Due"];
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
  
      const transactionPromises = invoices.map(async (invoice) => {
        const transactionResponse = await fetch(`${config.BASE_URL}/transaction/invoice/${invoice.invoiceId}`);
        if (transactionResponse.ok) {
          return await transactionResponse.json();
        }
        return [];
      });
  
      const transactionsData = await Promise.all(transactionPromises);
  
      const formattedData = invoices.map((invoice, index) => {
        const invoiceDate = new Date(invoice.invoiceDate);
        
        const formattedInvoiceDate = `${invoiceDate.getFullYear()}-${String(invoiceDate.getMonth() + 1).padStart(2, '0')}-${String(invoiceDate.getDate()).padStart(2, '0')} ${String(invoiceDate.getHours()).padStart(2, '0')}:${String(invoiceDate.getMinutes()).padStart(2, '0')}`;
  
        const transactionPrice = transactionsData[index]?.reduce((total, transaction) => total + transaction.paid, 0)  ;
        const transactiondue = transactionsData[index]?.reduce((total, transaction) => total + transaction.due, 0)  ;
        const transactionTypes = transactionsData[index]?.map((transaction) => transaction.transactionType).join(', ') || "Unknown";
  
        return [
          invoice.invoiceId,
          invoice.customer?.cusName || "Unknown",
          formattedInvoiceDate,
          transactionTypes,
          transactionPrice, 
          transactiondue,
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
             ) : error ? (
             <p>Error: {error}</p>
          ) : (<p></p>)}
          <Table
              data={data}
              columns={columns}
              btnName={btnName}
              title={title}
              invoice={invoice}
              showEdit={false}
            />
          
        </div>
      </div>
    </div>
  );
};

export default SalesHistory;
