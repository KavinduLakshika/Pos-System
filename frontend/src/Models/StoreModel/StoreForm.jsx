import React, { useState, useEffect } from 'react';
import '../StaffModel/StaffModal.css';
import config from '../../config';

const StoreForm = ({ closeModal, showModal, onSave }) => {
    const [formErrors, setFormErrors] = useState({});
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        status: 'Active',
    });

    useEffect(() => {
        if (!showModal) {
            setFormData({
                name: '',
                address: '',
                status: 'Active',
            });
            setFormErrors({});
            setError(null);
        }
    }, [showModal]);

    const validate = () => {
        const errors = {};

        if (!formData.name.trim()) {
            errors.name = 'Name is required';
        }
        if (!formData.address.trim()) {
            errors.address = 'Address is required';
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
            storeStatus: formData.status,
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
                alert('Store created successfully!');
                closeModal();
                onSave();
            }
        } catch (err) {
            setError('Failed to create store. Please try again.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }));

        if (formErrors[name]) {
            setFormErrors({ ...formErrors, [name]: '' });
        }
    };

    if (!showModal) return null;

    return (
        <div>
            <div className="modal-overlay">
                <div className="modal-content">
                    <h4>Add Department</h4>
                    {error && <p className="error">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Store Name</label>
                            <input type="text" value={formData.name} onChange={handleChange} name="name" id="name" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Store Address</label>
                            <input type="text" value={formData.address} onChange={handleChange} name="address" id="address" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="status">Store Status</label>
                            <select value={formData.status} onChange={handleChange} name="status" id="status" className="form-control">
                                <option value="Active">Active</option>
                                <option value="Close">Close</option>
                            </select>
                        </div>
                        <div className="form-actions">
                            <button type="button" className="btn btn-danger" onClick={closeModal}>Close</button>
                            <button type="submit" className="btn btn-primary">Save Changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default StoreForm;
