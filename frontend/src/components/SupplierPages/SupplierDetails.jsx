import React, { useEffect, useState } from 'react';
import Table from '../../components/Table/Table';
import config from '../../config';

function SupplierDetails() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const columns = ['#', 'Supplier Name', 'Supplier Address', 'NIC', 'Email', 'Contact 1', 'Contact 2', 'Advance', 'Balance', 'Payment date/Time ', 'Status'];

  const btnName = ' + New Supplier ';

  useEffect(() => {
    fetchSuppliers();
  })

  const fetchSuppliers = async () => {
    try {
      const response = await fetch(`${config.BASE_URL}/suppliers`);
      if (!response.ok) {
        throw new Error('Failed to fetch supplier list');
      }
      const supplier = await response.json();
      const formattedData = supplier.map(supplier => [
        supplier.supplierId,
        supplier.supplierName,
        supplier.supplierAddress,
        supplier.supplierNic,
        supplier.supplierEmail,
        supplier.supplierTP,
        supplier.supplierSecondTP,
        supplier.supplierPaid,
        supplier.supplierBalance,
        supplier.supplierPaymentDate,
        supplier.supplierStatus,
      ]);
      setData(formattedData);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="scrolling-container">
        <h4>Supplier Details</h4>
        <Table
          search={'Search by Supplier Name'}
          data={data}
          columns={columns}
          btnName={btnName}
        />
      </div>
    </div>
  );
}

export default SupplierDetails;
