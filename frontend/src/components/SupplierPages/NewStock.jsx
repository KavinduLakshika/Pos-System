import React from 'react';
import Table from '../Table/Table';

const columns = ['#', 'Store Name', 'Supplier Name/Position', 'Category', 'Product Name','Supplied Date & TIme','Supplied Quantity','Amount Per Item','Total Amount Before VAT' ,'VAT %', 'Total Amount + VAT' ];

const data = [
  ['1', 'ABC Store', 'John Doe/Manager','Category', 'Product Name', '2024.01.01 10.00AM', '100','1000',  'Rs.100 000','10%','Rs.11000'],
  ['2', 'XYZ Store', 'Jane Smith/Supplier', 'Category', 'Product Name', '2024.01.01 10.00AM', '100','1000', 'Rs.100 000','10%','Rs.11000']
];

const btnName = ' + Add New Stock';

function NewStock() {
  return (
    <div>
      <h2>New Stock </h2>
      <Table
        search={'Search by Supplier Name'}
        data={data}
        columns={columns}
        btnName={btnName}
      />
    </div>
  );
}

export default NewStock;
