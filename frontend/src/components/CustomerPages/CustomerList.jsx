import React, { useEffect, useState } from 'react';
import Table from '../Table/Table';
import Form from '../../Models/Form/Form';
import Modal from 'react-modal';
import config from '../../config';

const CustomerList = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);


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

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <div className="scrolling-container">
      <h4>Customer List</h4>

      <Table
        data={data}
        columns={columns}
        btnName={btnName}
        onAdd={openModal}
      />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="New Customer Form"
      >

        <Form closeModal={closeModal}
          style={{
            content: {
              width: '30%',
              height: '90%',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            },
          }} />
      </Modal>
    </div>
    </div>
  );
};

export default CustomerList;