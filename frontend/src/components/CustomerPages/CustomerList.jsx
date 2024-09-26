import React, { useState } from 'react';
import Table from '../Table/Table';
import Form from '../../Models/Form/Form';
import Modal from 'react-modal';


const CustomerList = () => {
  const [data] = useState([
    ['1', 'MaleeshaPa', 'pinkubura', '6969696969', 'MaleeshaBalla@gmail.com', '2000210021', '0', 'Active']
  ]);

  const columns = ['id', 'Customer', 'Address', 'Phone', 'Email', 'NIC', 'Points', 'Status'];
  const btnName = 'New Customer';

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
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
  );
};

export default CustomerList;