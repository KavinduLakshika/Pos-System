import { useEffect, useState, useRef } from "react";
import Table from '../Table/Table';
import config from '../../config';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { toPng } from 'html-to-image';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const SalesHistory = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const tableRef = useRef();

  const columns = ["ID", "Date/time", "Due Date", "Paid Amount", "Payable Amount", "Due Amount", "Total Amount", "Discount", "Customer", "Products"];
  const btnName = 'Add New Sale';

  useEffect(() => {
    fetchSalesHistory();
  }, []);

  // Fetching sales history data
  const fetchSalesHistory = async () => {
    try {
      const response = await fetch(`${config.BASE_URL}/invoices`);
      if (!response.ok) {
        throw new Error('Failed to fetch Sales Invoices');
      }
      const invoice = await response.json();

      const formattedData = invoice.map(invoice => {
        const invoiceDate = new Date(invoice.invoiceDate);

        const year = invoiceDate.getFullYear();
        const month = String(invoiceDate.getMonth() + 1).padStart(2, '0');
        const day = String(invoiceDate.getDate()).padStart(2, '0');

        const hours = String(invoiceDate.getHours()).padStart(2, '0');
        const minutes = String(invoiceDate.getMinutes()).padStart(2, '0');

        const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}`;

        return [
          invoice.invoiceId,
          formattedDateTime,
          invoice.invoiceDueDate,
          invoice.paidAmount,
          invoice.payableAmount,
          invoice.dueAmount,
          invoice.totalAmount,
          invoice.discount,
          invoice.customer?.cusName || "Unknown",
          invoice.product?.productName || "Unknown"
        ];
      });

      setData(formattedData);
      setFilteredData(formattedData);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };


  useEffect(() => {
    if (startDate && endDate) {
      filterDataByDateRange();
    }
  }, [startDate, endDate]);

  // Filter data by date 
  const filterDataByDateRange = () => {
    if (!startDate || !endDate) {
      setFilteredData(data);
      return;
    }

    const filtered = data.filter(row => {
      const invoiceDate = new Date(row[1].split(' ')[0]);
      return invoiceDate >= startDate && invoiceDate <= endDate;
    });

    setFilteredData(filtered);
  };

  // Reset filter
  const resetFilter = () => {
    setStartDate(null);
    setEndDate(null);
    setFilteredData(data); 
  };

  // PDF
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text("Sales History", 20, 20);

    const headers = columns.map(column => ({ content: column, styles: { halign: 'center' } }));
    const tableData = filteredData.map(row => row.map(cell => ({ content: cell, styles: { halign: 'center' } })));

    doc.autoTable({
      head: [headers],
      body: tableData,
      startY: 30,
      theme: 'striped',
      margin: { top: 10, right: 10, bottom: 10, left: 10 },
      styles: { fontSize: 5, halign: 'center', valign: 'middle' },
      headStyles: { fillColor: [255, 216, 126], textColor: 0, fontSize: 5 },
      bodyStyles: { textColor: 50 },
      alternateRowStyles: { fillColor: [250, 250, 250] }
    });

    doc.save("sales_history.pdf");
  };

  return (
    <div>
      <div className="scrolling-container">
        <div className="new-sales-container">

          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="mb-0">Sales History</h4>

            <div className="d-flex">
              <div className="me-2">
                <DatePicker
                  selected={startDate}
                  onChange={date => setStartDate(date)}
                  placeholderText="Start Date"
                  dateFormat="yyyy-MM-dd"
                  className="form-control"
                />
              </div>
              <div className="me-2">
                <DatePicker
                  selected={endDate}
                  onChange={date => setEndDate(date)}
                  placeholderText="End Date"
                  dateFormat="yyyy-MM-dd"
                  className="form-control"
                />
              </div>

              <button className="btn btn-danger btn-sm" onClick={resetFilter}>
                Reset
              </button>
            </div>

            <div className="button-container">
              <button className="btn btn-warning btn-sm me-2" onClick={generatePDF}>PDF</button>
            </div>
          </div>

          <div ref={tableRef}>
            <Table
              data={filteredData}
              columns={columns}
              btnName={btnName}
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default SalesHistory;
