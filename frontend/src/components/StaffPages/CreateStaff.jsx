import React, { useState, useEffect } from 'react'
import Table from '../Table/Table';
import StaffModal from '../../Models/StaffModel/StaffModal';
import config from '../../config';

const CreateStaff = () => {

  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStaff, setSelectedStaff] = useState(null);

  const columns = ["#", "Title", "Department / Job Position", "Full Name", "User Type", "User Name", "Email", "Contact 1", "Contact 2", "Address", "Nic", "Status"];
  const btnName = 'Add New Staff Member';

  useEffect(() => {
    fetchStaff();
  });

  const fetchStaff = async () => {
    try {
      const response = await fetch(`${config.BASE_URL}/users`);
      if (!response.ok) {
        throw new Error('Failed to fetch user list');
      }
      const user = await response.json();
      const formattedData = user.map(user => [
        user.userId,
        user.userTitle,
        user.store?.storeName || "unknown",
        user.userFullName,
        user.userType,
        user.userName,
        user.userEmail,
        user.userTP,
        user.userSecondTP,
        user.userAddress,
        user.userNIC,
        <select
          className='form-control'
          value={user.userStatus}
          onChange={(e) => handleStatusChange(user.userId, e.target.value)}
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

  const handleStatusChange = async (userId, newStatus) => {
    try {
      const response = await fetch(`${config.BASE_URL}/user/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userStatus: newStatus }),
      });

      if (!response.ok) {
        throw new Error('Failed to update user status');
      }
      fetchStaff();
    } catch (error) {
      setError(error.message);
    }
  };


  const handleDelete = async (rowIndex) => {
    try {
      const userId = data[rowIndex][0];
      const response = await fetch(`${config.BASE_URL}/user/${userId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      setData(prevData => prevData.filter((_, index) => index !== rowIndex));
      fetchStaff();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAddNewStaff = () => {
    setSelectedStaff(null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleEdit = (rowIndex) => {
    const selectedStaffData = data[rowIndex];
    setSelectedStaff({
      userId: selectedStaffData[0],
      title: selectedStaffData[1],
      department: selectedStaffData[2],
      fullName: selectedStaffData[3],
      userType: selectedStaffData[4],
      userName: selectedStaffData[5],
      email: selectedStaffData[6],
      contact1: selectedStaffData[7],
      contact2: selectedStaffData[8],
      address: selectedStaffData[9],
      nic: selectedStaffData[10]
    });
    setShowModal(true);
  };

  return (
    <div>
      <div className='scrolling-container'>
        <h4>Staff</h4>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <Table
            data={data}
            columns={columns}
            btnName={btnName}
            onAdd={handleAddNewStaff}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
        <StaffModal
          showModal={showModal}
          closeModal={closeModal}
          onSave={fetchStaff}
          staff={selectedStaff}
        />
      </div>
    </div>
  )
}

export default CreateStaff;