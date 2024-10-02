import React, { useState, useEffect } from 'react';
import './StaffModal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons'

const StaffModal = ({ showModal, closeModal, handleSubmit, editData }) => {
  const [formData, setFormData] = useState({
    title: '',
    fullName: '',
    userType: '',
    userName: '',
    email: '',
    password: '',
    nic: '',
    address: '',
    contact1: '',
    contact2: '',
    department: ''
  });
  useEffect(() => {
    if (editData) {
      setFormData({
        title: editData[1],
        fullName: editData[2],
        userType: editData[3],
        userName: editData[4],
        email: editData[5],
        nic: editData[7],
        address: editData[8],
        contact1: editData[9],
        contact2: editData[10],
        department: editData[11]
      });
    } else {
      setFormData({
        title: '',
        fullName: '',
        userType: '',
        userName: '',
        email: '',
        password: '',
        nic: '',
        address: '',
        contact1: '',
        contact2: '',
        department: ''
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
    const staffData = {
      userTitle: formData.title,
      userFullName: formData.fullName,
      userName: formData.userName,
      userType: formData.userType,
      userPassword: formData.password,
      userEmail: formData.email,
      userNIC: formData.nic,
      userAddress: formData.userAddress,
      userTP: formData.contact1,
      userSecondTP: formData.contact2,
      store: formData.department,
    };
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData({ ...formData, photo: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  if (!showModal) return null;


  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3 className='mb-3'>{editData ? 'Edit Staff Member' : 'Add New Staff Member'}</h3>
        <form onSubmit={handleFormSubmit}>

          <div className="form-group">
            <div className="photo-container">
              <img
                src={formData.photo || 'https://via.placeholder.com/150'}
                alt="User"
                className="user-photo"
              />
              <div className="edit-icon">
                <label htmlFor="photo-input">
                  <FontAwesomeIcon icon={faEdit} />
                </label>
                <input
                  id="photo-input"
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handlePhotoChange}
                />
              </div>
            </div>
          </div>
          <div className="form-flex">
            <div className="form-1">
              <div className="form-group">
                <label>Department / Job Position</label>
                <input type="text" name="department" value={formData.department} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>User Name <span>*</span></label>
                <input type="text" name="userName" value={formData.userName} onChange={handleChange} placeholder="Enter User Name" required />
              </div>
              <div className="form-group">
                <label>Email <span>*</span></label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter Email" required />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter Password" />
              </div>
            </div>

            <div className="form-1">
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
              <div className=" form-group mt-4">
              <button type="submit" className="btn btn-primary">Submit</button>
              <button type="button" className="btn btn-danger" onClick={closeModal}>Close</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StaffModal;
