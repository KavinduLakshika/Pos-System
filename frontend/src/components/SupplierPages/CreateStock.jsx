import React, { useState } from 'react'
import './CreateStock.css'
import Table from '../../components/Table/Table';

const CreateGRN = () => {
  const [formData, setFormData] = useState({
    store: '',
    date: '',
    refno: '',
    supplier: '',
    cashAmount: '',
    chequeAmount: '',
    due: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData)
  }

  const [data, setData] = useState([]);

  const columns = ['#', 'Product', 'Category', 'Price', 'Qty', 'Tatal price', 'VAT %', 'Total Price + VAT%'];


  const [iamge, setImage] = useState(null);
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
  }

  return (
    <div>
      <div className="scrolling-container">
        <h4>Create New Stock</h4>

        <form action="" className='' onSubmit={handleSubmit}>
          <div className="row">
            <div className=" col-md-5">
              <div className="row">
                <div className="grn-details col-md-10 mb-3">
                  <label htmlFor="">Store</label>
                  <select name="store" value={formData.store} id="" className='form-control' onChange={handleChange} >
                    <option value="Main">Main</option>
                    <option value="Sub">sub</option>
                  </select>
                </div>
              </div>

              <div className="row">
                <div className="grn-details col-md-5 mb-3">
                  <label htmlFor="">GRN Date</label>
                  <input type="datetime-local" name='date' value={formData.date} className='form-control' onChange={handleChange} />
                </div>
                <div className="grn-details col-md-5 mb-3">
                  <label htmlFor="">REF NO.</label>
                  <input type="text" name='refno' value={formData.refno} className='form-control' onChange={handleChange} />
                </div>
              </div>

              <div className="row">
                <div className="grn-details col-md-5 mb-3">
                  <label htmlFor="">Supplier</label>
                  <select name="supplier" value={formData.supplier} id="" className='form-control' onChange={handleChange} >
                    <option value="Main">Main</option>
                    <option value="Sub">sub</option>
                  </select>
                </div>
                <div className="grn-details col-md-5 mb-3">
                  <label htmlFor="">Received</label>
                  <select name="store" value={formData.store} id="" className='form-control' onChange={handleChange} >
                    <option value="Main">Main</option>
                    <option value="Sub">sub</option>
                  </select>
                </div>
              </div>

              <div className="row">
                <div className="grn-details col-md-5 mb-3">
                  <label htmlFor="">Cash Amount</label>
                  <input type="number" name='cashAmount' value={formData.cashAmount} className='form-control' onChange={handleChange} />
                </div>
                <div className="grn-details col-md-5 mb-3">
                  <label htmlFor="">Cheque Amount</label>
                  <input type="text" name='chequeAmount' value={formData.chequeAmount} className='form-control' onChange={handleChange} />
                </div>
              </div>
              <div className="row">
                <div className="grn-details col-md-10 mb-3">
                  <label htmlFor="">Due</label>
                  <input type="text" name='due' value={formData.due} className='form-control' onChange={handleChange} id='readOnly' readOnly />
                </div>
                <div className="grn-details col-md-10 mb-3">
                  <label htmlFor="">Bill Image</label>
                  <input type="file" name='image' accept='image/*' className='form-control' onChange={handleImageChange} />
                  {preview && (
                    <div className="mt-2">
                      <img src={preview} alt="Bill Image" width="200px" height="auto" />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="payment-details-supplier col-md-5">
              <div className="row">
                <div className="grn-payment col-md-6 mb-3">
                  <label htmlFor="">Product Name</label>
                  <input type="text" name="ProductName" id="" className='form-control' />
                </div>
                <div className="grn-payment col-md-6 mb-3">
                  <label htmlFor="">Product Category</label>
                  <select name="category" id="" className='form-control' >
                    <option value="">select</option>
                    <option value="">c1</option>
                    <option value="">c2</option>
                  </select>
                </div>
                <div className="grn-payment col-md-4 mb-3">
                  <label htmlFor="">Price</label>
                  <input type="text" name="price" id="" className='form-control' />
                </div>
                <div className="grn-payment col-md-4 mb-3">
                  <label htmlFor="">Quantity</label>
                  <input type="text" name="qty" id="" className='form-control' />
                </div>
                <div className="grn-payment col-md-4 mb-3">
                  <label htmlFor="">Total Price</label>
                  <input type="text" name="totalPrice" id="readOnly" className='form-control' />
                </div>
                <div className="grn-payment col-md-6 mb-3">
                  <label htmlFor="">VAT %</label>
                  <input type="text" name="" id="" className='form-control' />
                </div>
                <div className="grn-payment col-md-6 mb-3">
                  <label htmlFor="">Total Price + VAT %</label>
                  <input type="text" name="" id="readOnly" className='form-control' />
                </div>
                <div className="grn-payment mt-5 d-flex justify-content-end">
                  <button className='btn btn-primary'>Add Product To Table</button>
                </div>
              </div>
            </div>
          </div>

          <div className="bottom col-md-12">
            <div className="tabel-stock">
              <Table
                search={'Search by Supplier Name'}
                data={data}
                columns={columns}
                showButton={false}
                showActions={false}
                showSearch={false}
              />
            </div>
            <div className="grn-payment mt-5 d-flex justify-content-end">
              <button className='btn btn-danger btn-lg' value="Reset">Clear</button>
              <button className='btn btn-success btn-lg' value='submit'>New Stock</button>
            </div>
          </div>

        </form>

      </div>
    </div>

  )
}

export default CreateGRN