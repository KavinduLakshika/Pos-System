import React, { useState } from 'react'
import Table from '../Table/Table';

function StockHistory() {
    const [data,] = useState([["1", "Gold", "Ring", "24K", "30000", "50000", "6 months", "items 100","2024-01-01","අලුත් බඩු","image","Dutugamunu"]]);
    const columns= ['#','Category','Product Name','Product Weight','Buying Price','Selling Price','Warraty','Quantity','Stock Date','Description','Image','Supplier'];
    
  return (
    <div>
        <div>
        <h2>Stock History</h2>
        
        <Table
          search={'Search by Product Name'}
          data={data}
          columns={columns}
          showButton={false}
          showDelete={false}
          // showActions={false}          
        />
        </div>
    </div>
  )
}

export default StockHistory