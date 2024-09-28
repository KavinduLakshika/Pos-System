import React from 'react';
import Table from '../../components/Table/Table';

const columns = ['#', 'Store Name', 'Supplier Name/Position','Date','images', 'Payment'];

const data = [
  ['1', 'ABC Store', 'John Doe/Manager','2024-09-28 11.00AM','images', '1000'],
  ['2', 'XYZ Store', 'Jane Smith/Supplier','2024-09-28 11.00AM','images', '1000']
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
