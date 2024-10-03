import React, { useState } from 'react'
import Table from '../../components/Table/Table';
import StaffModal from '../../Models/StaffModel/StaffModal';


const Staff = () => {

  const [data, setData] = useState([["1", "Sales Dep.", "K K Somadasa","Email", "119", "118", "Watapika", "123","Username","Password","Status"]]);
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const columns = ["#", "Department / Job Position", "Full Name","Email@", "Contact 1", "Contact 2", "Address", "Nic","Username","Password","Status"];
  const btnName = 'Add New Staff Member';

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