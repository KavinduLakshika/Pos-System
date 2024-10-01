import React from 'react'
import Table from '../Table/Table';


function SalesHistory() {

  const columns = ['#', 'Date & Time', 'Product Category', 'Product Name', 'Size', 'Customer Name', 'Customer Nic', 'Value', 'Sold Price', 'Job Done By', 'Profit/Loss', 'Note'];
  const btnName = 'Generate Report';
  const data = [['1', '2024-08-09 10.11AM', 'Gold', 'Ring', '24K', 'Shiranthi Rajapaksha', '123', '50 000', '80 000', 'Admin', '30 000', 'Note']];

  return (
    <div>
      <div className="scrolling-container">
        <h4>Sales History Report</h4>
        <Table
          search={'Search by Customer Name , Product Name'}
          data={data}
          columns={columns}
          btnName={btnName} />
      </div>
    </div>
  )
}

export default SalesHistory