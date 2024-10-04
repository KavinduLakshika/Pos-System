import React, { useState } from 'react';
import '../StaffModel/StaffModal.css';
import config from '../../config';

const StoreForm = ({ closeModal, showModal }) => {
    const [formErrors, setFormErrors] = useState({});
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        status:'',
    });

    const handleChange = (e) => {
        const{name,value}=e.target;
        setFormData({...formData,[name]:value});

        if (formErrors[name]) {
            setFormErrors({ ...formErrors, [name]: '' });
        }
    };
    const validate = () => {
        const errors = {};
    
        if (!formData.name.trim()) {
            errors.name = 'Name is Required';
        }
        if (!formData.address.trim()) {
            errors.address = 'Address is Required';
        }
    
        return errors; 
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const errors = validate();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors); 
            return;
        }
    
        const storeData = {
            storeName: formData.name,
            storeAddress: formData.address,
            storeStatus:formData.status
        };
    
        try {
            const response = await fetch(`${config.BASE_URL}/store`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(storeData),
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.error || 'An error occurred.');
            } else {
                const data = await response.json();
                alert('Store created successfully!');
                closeModal();
            }
        } catch (err) {
            setError('Failed to create store. Please try again.');
        }
    };
    
  

    if (!showModal) return null;

    return (
        <div>
            <div className="modal-overlay">
                <div className="modal-content">
                    <h4>Add Department</h4>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="">Store Name</label>
                            <input type="text" value={formData.name} onChange={handleChange} name="name" id="name" className='form-control' />
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Store Address</label>
                            <input type="text" value={formData.address} onChange={handleChange} name="address" id="address" className='form-control' />
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Store Status</label>
                            <input type="text" value={formData.status} onChange={handleChange} name="status" id="status" className='form-control' />
                        </div>
                        <div className="form-actions">
                            <button type="button" className="btn btn-danger" onClick={closeModal}>Close</button>
                            <button type="submit" className="btn btn-primary">Save Changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default StoreForm