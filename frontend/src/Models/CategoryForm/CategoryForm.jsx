import React from 'react'

const CategoryForm = ({closeModal, showModal, selectedCategory}) => {

    if (!showModal) return null;

    return (
        <div>
            <div className="modal-overlay">
                <div className="modal-content">
                    <h4>{selectedCategory ? 'Edit Category' : 'Add Category'}</h4>
                    <form >
                        <div className="form-group">
                            <label htmlFor="categoryName">Category Name</label>
                            <input type="text" name="categoryName" id="categoryName" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="categoryType">Category Type</label>
                            <input type="text" name="categoryType" id="categoryType" className="form-control" />
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

export default CategoryForm