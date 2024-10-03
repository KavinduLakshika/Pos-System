import React from 'react'
import Table from '../Table/Table';
import { useNavigate } from 'react-router-dom';

function DailySales() {

  const columns = ['#', 'Date & Time', 'Product Category', 'Product Name', 'Size', 'Customer Name', 'Customer Nic', 'Value', 'Sold Price', 'Job Done By', 'Profit/Loss', 'Note'];
  const btnName = '+ New Sale';
  const data = [['1', '2024-08-09 10.11AM', 'Gold', 'Ring', '24K', 'Shiranthi Rajapaksha', '123', '50 000', '80 000', 'Admin', '30 000', 'Note']];

  const navigate = useNavigate();

  const handleNewSale = () => {
    navigate('/sales/new');
  }
  return (
    <div>
      <div className="scrolling-container">
        <h4>Day Job Report</h4>
        <Table
          search={'Search by Customer Name , Product Name'}
          data={data}
          columns={columns}
          btnName={btnName}
          onAdd={handleNewSale}
        />
      </div>
    </div>
  )
}

export default DailySales