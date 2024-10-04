import React from 'react'
import '../StaffModel/StaffModal.css';


const StoreForm = ({ closeModal, showModal }) => {

    if (!showModal) return null;

    return (
        <div>
            <div className="modal-overlay">
                <div className="modal-content">
                    <h4>Add Department</h4>
                    <form >
                        <div className="form-group">
                            <label htmlFor="">Store Name</label>
                            <input type="text" name="name" id="name" className='form-control' />
                        </div>
                        <div className="form-group">
                            <label htmlFor="">Store Address</label>
                            <input type="text" name="address" id="address" className='form-control' />
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