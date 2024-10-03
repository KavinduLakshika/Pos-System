import React, { useEffect, useState } from 'react';
import Table from '../Table/Table';
import Form from '../../Models/Form/Form';
import Modal from 'react-modal';
import config from '../../config';

const CustomerList = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedCus, setSelectedCus] = useState(null); 

  const columns = ['id', 'Customer', 'Customer Code', 'Address', 'Phone', 'Email', 'NIC', 'Job', 'Office', 'Office TP', 'Office Address', 'Points', 'Status'];
  const btnName = 'New Customer';

  useEffect(() => {
    fetchCustomer();
  }, []);

  const fetchCustomer = async () => {
    try {
      const response = await fetch(`${config.BASE_URL}/customers`);
      if (!response.ok) {
        throw new Error('Failed to fetch Customer list');
      }
      const cus = await response.json();
      const formattedData = cus.map(cus => [
        cus.cusId,
        cus.cusName,
        cus.cusCode,
        cus.cusAddress,
        cus.cusPhone,
        cus.cusEmail,
        cus.cusNIC,
        cus.cusJob,
        cus.cusCompany,
        cus.cusWorkPlaceTP,
        cus.cusWorkPlaceAddress,
        cus.cusPoints,
        cus.cusStatus,
      ]);
      setData(formattedData);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const handleDelete = async (rowIndex) => {
    try {
      const cusId = data[rowIndex][0];
      const response = await fetch(`${config.BASE_URL}/customer/${cusId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete customer');
      }

      setData(prevData => prevData.filter((_, index) => index !== rowIndex));
      fetchCustomer();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (rowIndex) => {
    const selectedCusData = data[rowIndex];
    setSelectedCus({
      cusId: selectedCusData[0],
      cusName: selectedCusData[1],
      cusCode: selectedCusData[2],
      cusAddress: selectedCusData[3],
      cusPhone: selectedCusData[4],
      cusEmail: selectedCusData[5],
      cusNIC: selectedCusData[6],
      cusJob: selectedCusData[7],
      cusCompany: selectedCusData[8],
      cusWorkPlaceTP: selectedCusData[9],
      cusWorkPlaceAddress: selectedCusData[10]
    });
    setModalIsOpen(true);
  };

  const openModal = () => {
    setSelectedCus(null); 
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    fetchCustomer(); 
  };

  return (
    <div>
      <div className="scrolling-container">
        <h4>Customer List</h4>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <Table
            data={data}
            columns={columns}
            btnName={btnName}
            onAdd={openModal}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        )}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Customer Form"
        >
          <Form
            closeModal={closeModal}
            onSave={fetchCustomer} 
            cus={selectedCus} 
            style={{
              content: {
                width: '30%',
                height: '90%',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              },
            }}
          />
        </Modal>
      </div>
    </div>
  );
};

export default CustomerList;
