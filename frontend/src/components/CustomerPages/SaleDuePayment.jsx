import React, { useState } from 'react';
import Table from '../Table/Table'

const SaleDuePayment = () => {

  
  const [data,] = useState([
    [],
  ]);
  const Columns = ["Invoice Id", 'Invoice Date', 'Customer', 'Invoice Amount','Paid Amount','Due Amount','Creadit Age'];
  return (
    <div>
      <div className="scrolling-container">
        <h1>JobDuePayment</h1>
        <Table
            data={data}
            columns={Columns}
            showButton={false}
          />
      </div>
    </div>
  )
}

export default SaleDuePayment