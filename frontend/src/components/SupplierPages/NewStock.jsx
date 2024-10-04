import React, { useState } from 'react';
import './NewStock.css';
import Table from '../Table/Table';

const NewStock = () => {
  const [formData, setFormData] = useState({
    store: '',
    date: '',
    refno: '',
    supplier: '',
    cashAmount: '',
    chequeAmount: '',
    due: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  const [data, setData] = useState([]);

  const columns = [
    '#', 'Store Name', 'Supplier Name/Position', 'Category', 'Product Name',
    'Supplied Date & Time', 'Supplied Quantity', 'Price Per Item',
    'Total Price Before VAT', 'VAT %', 'Total Amount + VAT'
  ];

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="container-fluid my-5 mt-2">
      <h4 className=" mb-4">Create New Stock</h4>

      <form onSubmit={handleSubmit}>
        <div className="row">
          {/* Left Column */}
          <div className="col-md-6">
            <div className="mb-3">
              <label htmlFor="refno" className="form-label">Reference Number (ID)</label>
              <input type="text" name="refno" value={formData.refno} className="form-control" onChange={handleChange} />
            </div>

            <div className="mb-3">
              <label htmlFor="store" className="form-label">Store / Supplier / Supplier Name</label>
              <select name="store" value={formData.store} className="form-select" onChange={handleChange}>
                <option value="Main">Main</option>
                <option value="Sub">Sub</option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="date" className="form-label">Supplied Date</label>
              <input type="datetime-local" name="date" value={formData.date} className="form-control" onChange={handleChange} />
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="cashAmount" className="form-label">Cash Amount</label>
                <input type="number" name="cashAmount" value={formData.cashAmount} className="form-control" onChange={handleChange} />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="chequeAmount" className="form-label">Cheque Amount</label>
                <input type="text" name="chequeAmount" value={formData.chequeAmount} className="form-control" onChange={handleChange} />
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="due" className="form-label">Due</label>
              <input type="text" name="due" value={formData.due} className="form-control" readOnly />
            </div>

            <div className="mb-3">
              <label htmlFor="image" className="form-label">Bill Image</label>
              <input type="file" name="image" accept="image/*" className="form-control" onChange={handleImageChange} />
              {preview && (
                <div className="mt-3">
                  <img src={preview} alt="Bill" className="img-thumbnail" style={{ maxWidth: '200px' }} />
                </div>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="ProductName" className="form-label">Product Name</label>
                <input type="text" name="ProductName" className="form-control" />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="category" className="form-label">Product Category</label>
                <select name="category" className="form-select">
                  <option value="">Select</option>
                  <option value="c1">Category 1</option>
                  <option value="c2">Category 2</option>
                </select>
              </div>

              <div className="col-md-4 mb-3">
                <label htmlFor="price" className="form-label">Price</label>
                <input type="text" name="price" className="form-control" />
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="qty" className="form-label">Quantity</label>
                <input type="text" name="qty" className="form-control" />
              </div>
              <div className="col-md-4 mb-3">
                <label htmlFor="totalPrice" className="form-label">Total Price</label>
                <input type="text" name="totalPrice" className="form-control" readOnly />
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="vat" className="form-label">VAT %</label>
                <input type="text" name="vat" className="form-control" />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="totalPriceVAT" className="form-label">Total Price + VAT</label>
                <input type="text" name="totalPriceVAT" className="form-control" readOnly />
              </div>
            </div>

            <div className="d-flex justify-content-end mt-4">
              <button className="btn btn-primary">Add Product</button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="table-responsive mt-5">
          <Table
            search="Search by Supplier Name"
            data={data}
            columns={columns}
            showButton={false}
            showActions={true}
            showSearch={true}
          />
        </div>

        {/* Footer Buttons */}
        <div className="d-flex justify-content-end mt-4">
          <button type="reset" className="btn btn-danger me-2">Clear</button>
          <button type="submit" className="btn btn-success">New Stock</button>
        </div>
      </form>
    </div>
  );
};

export default NewStock;
