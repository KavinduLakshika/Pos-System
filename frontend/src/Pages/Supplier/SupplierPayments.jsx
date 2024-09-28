import React from 'react';
import Table from '../../components/Table/Table';

const columns = ['#', 'Store Name', 'Supplier Name/Position','Date','Total Amount', 'Paid' , 'Outstanding', 'Status'];

const data = [
  ['1', 'ABC Store', 'John Doe/Manager','2024-09-28 11.00AM','5000', '4000', '1000', 'Status'],
  ['2', 'XYZ Store', 'Jane Smith/Supplier','2024-09-28 11.00AM', '5000', '4000', '1000', 'Status']
];

const btnName = ' + New Payment To Supplier ';

function SupplierPayments() {
  return (
    <div>
      <h2>Supplier Payment Details</h2>
      <Table
        search={'Search by Supplier Name'}
        data={data}
        columns={columns}
        btnName={btnName}
      />
    </div>
  );
}

export default SupplierPayments;
