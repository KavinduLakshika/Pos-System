import React, { useState } from 'react'
import Table from '../../components/Table/Table';
import { useNavigate } from 'react-router-dom';



function CurrentStock() {


  const [data,] = useState([["1", "Gold", "Ring", "24K", "items 100", "2024-01-01", "අලුත් බඩු", "image", "Dutugamunu", "Available 50 items"]]);


  const columns = ['#', 'Category', 'Product Name', 'Product Weight', , 'Quantity', 'Stock Date', 'Description', 'Image', 'Supplier', 'Status'];
  const btnName = '+ New Stock';

  const navigate = useNavigate();

  const handleNewStockClick = () => {
    navigate('/supplier/new-stock');
  };


  return (

    <div>
      <div className="scrolling-container">
        <h4>Current Stock</h4>
        <Table
          search={'Search by Product Name'}
          data={data}
          columns={columns}
          btnName={btnName}
          onAdd={handleNewStockClick}
        />
      </div>
    </div>
  )
}

export default CurrentStock