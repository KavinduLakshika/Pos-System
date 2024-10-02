import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import './StaffModal.css';

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
    <div class="overlay">
      <div className="modal-overlay">
        <h3 className='mb-3'>{editData ? 'Edit Staff Member' : 'Add New Staff Member'}</h3>
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
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Enter Full Name" required />
              </div>
            </div>
            <div className="form-group-name-flex">
              <div className="form-group-name">
                <label>User Type <span>*</span></label>
                <select name="userType" value={formData.userType} onChange={handleChange} required>
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
                </select>
              </div>
              <div className="form-group-name">
                <label>User Name <span>*</span></label>
                <input type="text" name="userName" value={formData.userName} onChange={handleChange} placeholder="Enter User Name" required />
              </div>
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
          <div className="form-group-2">
            <div className="form-group">
              <label>NIC</label>
              <input type="text" name="nic" value={formData.nic} onChange={handleChange} placeholder="Enter NIC" />
            </div>
            <div className="form-group">
              <label>Address</label>
              <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Enter Address" />
            </div>
            <div className="form-group">
              <label>Contact 1</label>
              <input type="text" name="contact1" value={formData.contact1} onChange={handleChange} placeholder="Enter Contact" />
            </div>
            <div className="form-group">
              <label>Contact 2</label>
              <input type="text" name="Contact2" value={formData.Contact2} onChange={handleChange} placeholder="Enter Contact 2" />
            </div>
            <div className="form-group-name">
              <label>Department <span>*</span></label>
              <select name="department" value={formData.department} onChange={handleChange} required>
                <option value="Main">Main</option>
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
