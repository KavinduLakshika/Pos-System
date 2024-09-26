import React, { useState } from 'react';
import './Form.css'

const Form = ({ closeModal }) => {
  const [formData, setFormData] = useState({
    title: 'Mr.',
    name: '',
    phone: '',
    email: '',
    nic: '',
    address: '',
    company: '',
    jobPosition: '',
    workplacePhone: '',
    workplaceAddress: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div>
      <h2>New Customer</h2>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-gorup-1">

          <div className="form-group-name">
            <div className="form-group">
              <label>Title <span>*</span></label>
              <select name="title" value={formData.title} onChange={handleChange}>
                <option value="Mr.">Mr.</option>
                <option value="Mrs.">Mrs.</option>
                <option value="Ms.">Ms.</option>
              </select>
              <div className="form-group">
                <label>Name <span>*</span></label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter Full Name" required />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>Phone <span>*</span></label>
            <input type="text" name="phone1" value={formData.phone1} onChange={handleChange} placeholder="Enter Phone" required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter Email" />
          </div>
          <div className="form-group">
            <label>NIC</label>
            <input type="text" name="nic" value={formData.nic} onChange={handleChange} placeholder="Enter NIC" />
          </div>
          <div className="form-group">
            <label>Address</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Enter Address" />
          </div>
        </div>

        <div className="form-group-2">
          <div className="form-group">
            <label>Company</label>
            <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Enter Workplace" />
          </div>
          <div className="form-group">
            <label>Job Position</label>
            <input type="text" name="jobPosition" value={formData.jobPosition} onChange={handleChange} placeholder="Enter Job Position" />
          </div>
          <div className="form-group">
            <label>Workplace Phone</label>
            <input type="text" name="workplacePhone" value={formData.workplacePhone} onChange={handleChange} placeholder="Enter Office Phone" />
          </div>
          <div className="form-group">
            <label>Workplace Address</label>
            <input type="text" name="workplaceAddress1" value={formData.workplaceAddress} onChange={handleChange} placeholder="Workplace Address" />
          </div>


          <div className="form-actions">
            <button type="button" onClick={closeModal}>Close</button>
            <button type="submit">Save</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;