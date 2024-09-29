import React, { useState, useEffect } from 'react'
import Table from '../../components/Table/Table';
import StaffModal from './StaffModal';
import config from '../../config';

const Staff = () => {

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const columns = ["#", "Department / Job Position", "Full Name", "UserName", "User Type", "Email", "NIC", "Contact 1", "Contact 2", "Address", "Status"];
  const btnName = '+ New Staff Member';

  useEffect(() => {
    fetchSuppliers();
  })

  const fetchSuppliers = async () => {
    try {
      const response = await fetch(`${config.BASE_URL}/users`);
      if (!response.ok) {
        throw new Error('Failed to fetch staff list');
      }
      const user = await response.json();
      const formattedData = user.map(user => [
        user.userId,
        user.store?.storeName || "Unknown",
        user.userFullName,
        user.userName,
        user.userType,
        user.userEmail,
        user.userNIC,
        user.userTP,
        user.userSecondTP,
        user.userAddress,
        user.userStatus,
      ]);
      setData(formattedData);
      setIsLoading(false);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const handleAddNewStaff = () => {
    setEditIndex(null);
    setShowModal(true);
  };


  const closeModal = () => {
    setShowModal(false);
  };


  const handleSubmit = (formData) => {
    if (editIndex === null) {

      const newStaff = [
        (data.length + 1).toString(),
        formData.department,
        formData.fullName,
        formData.contact1,
        formData.contact2,
        formData.address,
        formData.nic
      ];
      setData([...data, newStaff]);
    } else {

      const updatedData = [...data];
      updatedData[editIndex] = [
        data[editIndex][0],
        formData.department,
        formData.fullName,
        formData.contact1,
        formData.contact2,
        formData.address,
        formData.nic
      ];
      setData(updatedData);
    }
    setShowModal(false);
  };


  const handleEdit = (index) => {
    setEditIndex(index);
    setShowModal(true);
  };


  const handleDelete = (index) => {
    const updatedData = data.filter((_, i) => i !== index);
    setData(updatedData);
  };

  return (
    <div>
      <div>
        <h2>Staff</h2>

        <Table
          search={'Search by Name'}
          data={data}
          columns={columns}
          btnName={btnName}
          onAdd={handleAddNewStaff}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
        <StaffModal
          showModal={showModal}
          closeModal={closeModal}
          handleSubmit={handleSubmit}
          editData={editIndex !== null ? data[editIndex] : null}
        />
      </div>

    </div>
  )
}

export default Staff