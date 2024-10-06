import React, { useEffect, useState } from 'react';
import Table from '../../components/Table/Table';
import config from '../../config';

function SupplierDetails() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const columns = ['#', 'Supplier Name', 'Supplier Address', 'NIC', 'Email', 'Contact 1', 'Contact 2', 'Paid', 'Balance', 'Payment Date', 'Status'];

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
        <select
          className='form-control'
          value={supplier.supplierStatus}
          onChange={(e) => handleStatusChange(supplier.supplierId, e.target.value)}
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
      ]);
      setData(formattedData);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };
  const handleStatusChange = async (supplierId, newStatus) => {
    try {
      const response = await fetch(`${config.BASE_URL}/supplier/${supplierId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ supplierStatus: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update supplier status');
      }
      fetchSuppliers();
    } catch (error) {
      setError(error.message);
    }
  };

  const title='Supplier Details';
  const invoice='Supplier Details.pdf';

  return (
    <div>
      <div className="scrolling-container">
        <h4>Supplier Details</h4>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <Table
            search={'Search by Supplier Name'}
            data={data}
            columns={columns}
            btnName={btnName}
            title={title}
            invoice={invoice}
          />
        )}
      </div>
    </div>
  );
}

export default SupplierDetails;
