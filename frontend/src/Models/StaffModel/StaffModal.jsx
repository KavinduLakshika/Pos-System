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
        <div class="modal-header">
          <h3 className='mb-3'>{editData ? 'Edit Staff Member' : 'Add New Staff Member'}</h3>
          <button class="close-icon" onClick={closeModal}>&times;</button>
        </div>
        <form onSubmit={handleFormSubmit} className="form-container">
          <div className="form-group-1">
            <div className="form-group-name-flex">
              <div className="form-group-name">
                <label>Title <span>*</span></label>
                <select name="title" value={formData.title} onChange={handleChange} required>
                  <option value="Mr.">Mr.</option>
                  <option value="Mrs.">Mrs.</option>
                  <option value="Ms.">Ms.</option>
                </select>
              </div>
              <div className="form-group-name">
                <label>Full Name <span>*</span></label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter Full Name" required />
              </div>
            </div>
            <div className="form-group-name-flex">
              <div className='form-group-name'>
                <label>User Name <span>*</span></label>
                <input type="text" name="uname" value={formData.uname} onChange={handleChange} placeholder="Enter User Name" required />
              </div>
              <div className='form-group-name'>
                <label>User Type <span>*</span></label>
                <select name="userType" value={formData.userType} onChange={handleChange} required>
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Password<span>*</span></label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter password" required />
            </div>
            <div className="form-group">
              <label>Confirm Password <span>*</span></label>
              <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Confirm password" required />
            </div>
          </div>
          <div className="form-group-2">
            <div className="form-group">
              <label>NIC<span>*</span></label>
              <input type="text" name="nic" value={formData.nic} onChange={handleChange} placeholder="Enter NIC" required />
            </div>
            <div className="form-group">
              <label>Address<span>*</span></label>
              <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Enter Address" required />
            </div>
            <div className="form-group">
              <label>Email<span>*</span></label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter Email" required />
            </div>
            <div className="form-group">
              <label>Contact Number 1<span>*</span></label>
              <input type="text" name="tp1" value={formData.tp1} onChange={handleChange} placeholder="Enter Phone Number" required />
            </div>
            <div className="form-group">
              <label>Contact Number 2</label>
              <input type="text" name="tp2" value={formData.tp2} onChange={handleChange} placeholder="Enter Phone Number" />
            </div>
            <div className="form-group">
              <label>Department<span>*</span></label>
              <select name="department" value={formData.department} onChange={handleChange} required>
                <option value="main">Main</option>
              </select>
            </div>
            <div className="form-actions">
              <button type="button" onClick={closeModal}>Close</button>
              <button type="submit">Save</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StaffModal;
