import React, { useState, useEffect } from 'react';
import './StaffModal.css';

const StaffModal = ({ showModal, closeModal, handleSubmit, editData }) => {
  const [formData, setFormData] = useState({
    department: '',
    fullName: '',
    contact1: '',
    contact2: '',
    address: '',
    nic: ''
  });

  useEffect(() => {
    if (editData) {
      setFormData({
        
        department: editData[1],
        fullName: editData[2],
        contact1: editData[3],
        contact2: editData[4],
        address: editData[5],
        nic: editData[6]
      });
    } else {
      setFormData({
        department: '',
        fullName: '',
        contact1: '',
        contact2: '',
        address: '',
        nic: ''
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(formData);
  };

  if (!showModal) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3 className='mb-3'>{editData ? 'Edit Staff Member' : 'Add New Staff Member'}</h3>
        <form onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label>Department / Job Position</label>
            <input type="text" name="department" value={formData.department} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Contact 1</label>
            <input type="text" name="contact1" value={formData.contact1} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Contact 2</label>
            <input type="text" name="contact2" value={formData.contact2} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>NIC</label>
            <input type="text" name="nic" value={formData.nic} onChange={handleChange} required />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
          <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
        </form>
      </div>
    </div>
  );
};

export default StaffModal;
