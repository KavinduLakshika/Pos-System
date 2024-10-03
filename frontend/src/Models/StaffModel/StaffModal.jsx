import React, { useState, useEffect } from 'react';
import './StaffModal.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import config from '../../config';

const StaffModal = ({ showModal, closeModal, staff }) => {
  const [image, setImage] = useState(null);
  const [stores, setStores] = useState([]);

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
    department: '',
    photo: ''
  });

  // Fetch stores
  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await fetch(`${config.BASE_URL}/stores`);
        if (response.ok) {
          const data = await response.json();
          setStores(data);
        } else {
          console.error('Failed to fetch stores');
        }
      } catch (error) {
        console.error('Error fetching stores:', error);
      }
    };

    fetchStores();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prevFormData) => ({ ...prevFormData, photo: reader.result }));
      setImage(file);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('userTitle', formData.title);
    formDataToSend.append('userFullName', formData.fullName);
    formDataToSend.append('userType', formData.userType);
    formDataToSend.append('userName', formData.userName);
    formDataToSend.append('userEmail', formData.email);
    formDataToSend.append('userNIC', formData.nic);
    formDataToSend.append('userAddress', formData.address);
    formDataToSend.append('userTP', formData.contact1);
    formDataToSend.append('userSecondTP', formData.contact2);
    formDataToSend.append('storeId', formData.department);

    if (formData.password) {
      formDataToSend.append('userPassword', formData.password);
    }

    if (image) {
      formDataToSend.append('userImage', image);
    }

    try {
      const response = await fetch(`${config.BASE_URL}/user`, {
        method: 'POST',
        body: formDataToSend,
      });
      if (response.ok) {
        const data = await response.json();
        console.log('User created:', data);
        alert('Create User successfully');
      } else {
        const errorData = await response.json();
        console.error('Failed to create User:', errorData);
        alert(errorData.error || 'Failed to create User');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while creating the User.');
    }
  };

  if (!showModal) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3 className="mb-3">{staff ? 'Edit Staff Member' : 'Add New Staff Member'}</h3>
        <form onSubmit={handleSubmit}>
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
                <label>Title <span>*</span></label>
                <select name="title" value={formData.title} onChange={handleChange} required>
                  <option value="Mr.">Mr.</option>
                  <option value="Mrs.">Mrs.</option>
                  <option value="Ms.">Ms.</option>
                </select>
              </div>
              <div className="form-group">
                <label>Department / Job Position</label>
                <select name="department" id=""
                  onChange={handleChange}
                  className="form-control"
                  required
                >
                  <option value="select">Select Department</option>
                  {stores.map((store) => (
                    <option key={store.storeId} value={store.storeId}>
                      {store.storeName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>User Name <span>*</span></label>
                <input
                  type="text"
                  name="userName"
                  value={formData.userName}
                  onChange={handleChange}
                  placeholder="Enter User Name"
                  required
                />
              </div>
              <div className="form-group">
                <label>Email <span>*</span></label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter Email"
                  required
                />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter Password"
                />
              </div>
            </div>

            <div className="form-1">
              <div className="form-group-name">
                <label>User Type <span>*</span></label>
                <select name="userType" value={formData.userType} onChange={handleChange} required>
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
                </select>
              </div>
              <div className="form-group">
                <label>Contact 1</label>
                <input
                  type="text"
                  name="contact1"
                  value={formData.contact1}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Contact 2</label>
                <input
                  type="text"
                  name="contact2"
                  value={formData.contact2}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>NIC</label>
                <input
                  type="text"
                  name="nic"
                  value={formData.nic}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group mt-4">
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
