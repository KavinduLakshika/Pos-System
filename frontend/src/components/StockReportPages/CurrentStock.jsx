import React, { useState } from 'react'
import Table from '../../components/Table/Table';




function CurrentStock() {


    const [data,] = useState([["1", "Gold", "Ring", "24K",  "items 100","2024-01-01","අලුත් බඩු","image","Dutugamunu","Available 50 items"]]);


    const columns= ['#','Category','Product Name','Product Weight',,'Quantity','Stock Date','Description','Image','Supplier','Status'];
    const btnName = '+ New Stock';

  return (

    <div>
        <div>
        <h2>Current Stock</h2>
        
        <Table
          search={'Search by Product Name'}
          data={data}
          columns={columns}
          btnName={btnName}
          
        />
        </div>
    </div>
  )
}

export default CurrentStock