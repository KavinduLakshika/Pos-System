import React from 'react';
import Table from '../../components/Table/Table';

const columns = ['#', 'Store Name', 'Supplier Name/Position', 'Contact 1', 'Contact 2', 'Address'];

const data = [
  ['1', 'ABC Store', 'John Doe/Manager', '123-456-7890', '098-765-4321', '123 Main St'],
  ['2', 'XYZ Store', 'Jane Smith/Supplier', '123-456-0000', '111-222-3333', '456 Elm St']
];

const btnName = ' + New Supplier ';

function SupplierDetails() {
  return (
    <div>
      <h2>Supplier Details</h2>
      <Table
        search={'Search by Supplier Name'}
        data={data}
        columns={columns}
        btnName={btnName}
      />
    </div>
  );
}

export default SupplierDetails;
