import React, { useState } from 'react'
import './Product.css'

const CreateProduct = () => {

  const [formData, setFormData] = useState({
    superCategory: 'select',
    productCategory: 'select',
    productName: '',
    productCode: '',
    sellingPrice: '',
    minPrice: '',
    warranty: '',
    reOrderLevel: '',
    description: '',
    label: '',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

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
    <div>
      <div className="scrolling-container">
        <h4>Add Product</h4>

        <div className="row">
          <form action="" className='col-md-8 product-form' onSubmit={handleSubmit}>
            <div className="row">
              <div className="product-details col-md-4 mb-2">
                <label htmlFor="" className='mb-1'>Super category</label>
                <select name="superCategory" value={formData.superCategory} onChange={handleChange} id="" className="form-control">
                  <option value="1">select</option>
                  <option value="2">cat1</option>
                  <option value="3">cat2</option>
                </select>
              </div>
              <div className="product-details col-md-4 mb-2">
                <label htmlFor="" className='mb-1'>Product category</label>
                <select name="producCategory" id="" onChange={handleChange} className="form-control">
                  <option value="1">select</option>
                  <option value="2">procat1</option>
                  <option value="3">procat2</option>
                </select>
              </div>
            </div>

            <div className="row">
              <div className="product-details col-md-4 mb-2">
                <label htmlFor="" className='mb-1'>Product Name</label>
                <input onChange={handleChange} type="text" name='productName' id='' value={formData.productName} className='form-control' />
              </div>
              <div className="product-details col-md-4 mb-2">
                <label htmlFor="" className='mb-1'>Product Code</label>
                <input onChange={handleChange} type="text" name='productCode' id='' value={formData.productCode} className='form-control' />
              </div>
            </div>

            <div className="row">
              <div className="product-details col-md-4 mb-2">
                <label htmlFor="" className='mb-1'>Selling Price</label>
                <input onChange={handleChange} type="number" name='sellingPrice' onWheel={(e) => e.target.blur()} id='' value={formData.sellingPrice} className='form-control' />
              </div>
              <div className="product-details col-md-4 mb-2">
                <label htmlFor="" className='mb-1'>Min price</label>
                <input onChange={handleChange} type="number" name='minPrice' id='' onWheel={(e) => e.target.blur()} value={formData.minPrice} className='form-control' />
              </div>
            </div>

            <div className="row">
              <div className="product-details col-md-4 mb-2">
                <label htmlFor="" className='mb-1'>Warranty</label>
                <select name='warranty' id='' value={formData.warranty} className='form-control' onChange={handleChange} >
                  <option value="No Warranty">No Warranty</option>
                  <option value="1 Months">1 Months</option>
                  <option value="2 Months">2 Months</option>
                  <option value="3 Months">3 Months</option>
                  <option value="4 Months">4 Months</option>
                  <option value="5 Months">5 Months</option>
                  <option value="6 Months">6 Months</option>
                  <option value="7 Months">7 Months</option>
                  <option value="8 Months">8 Months</option>
                  <option value="9 Months">9 Months</option>
                  <option value="10 Months">10 Months</option>
                  <option value="11 Months">11 Months</option>
                  <option value="12 Months">12 Months</option>
                  <option value="13 Months">13 Months</option>
                  <option value="14 Months">14 Months</option>
                  <option value="15 Months">15 Months</option>
                  <option value="16 Months">16 Months</option>
                  <option value="17 Months">17 Months</option>
                  <option value="18 Months">18 Months</option>
                  <option value="19 Months">19 Months</option>
                  <option value="20 Months">20 Months</option>
                  <option value="21 Months">21 Months</option>
                  <option value="22 Months">22 Months</option>
                  <option value="23 Months">23 Months</option>
                  <option value="24 Months">24 Months</option>
                  <option value="25 Months">25 Months</option>
                  <option value="26 Months">26 Months</option>
                  <option value="27 Months">27 Months</option>
                  <option value="28 Months">28 Months</option>
                  <option value="29 Months">29 Months</option>
                  <option value="30 Months">30 Months</option>
                  <option value="31 Months">31 Months</option>
                  <option value="32 Months">32 Months</option>
                  <option value="33 Months">33 Months</option>
                  <option value="34 Months">34 Months</option>
                  <option value="35 Months">35 Months</option>
                  <option value="36 Months">36 Months</option>
                </select>
              </div>
              <div className="product-details col-md-4 mb-2">
                <label htmlFor="" className='mb-1'>Description</label>
                <textarea onChange={handleChange} name='description' id='' value={formData.description} className='form-control' rows={2}></textarea>
              </div>
            </div>

            <div className="row">
              <div className="product-details col-md-4 mb-2">
                <label htmlFor="" className='mb-1'>Item Image</label>
                <input type="file" name='image' id='' accept="image/*" onChange={handleImageChange} className='form-control' />
                {preview && (
                  <div style={{ margin: '10px auto' }}>
                    <img src={preview} alt="Preview" style={{ width: '300px', height: 'auto' }} />
                  </div>
                )}
              </div>
            </div>
            {/* <div className="product-details">
            <label htmlFor="">Product Name</label>
            <select name="" id="">
              <option value=""></option>
            </select>
          </div> */}
            <div className="sales-addbtn d-grid d-md-flex me-md-2 justify-content-end px-5">
              <button type='reset' className="btn btn-danger btn-md">Clear</button>
              <button className="btn btn-primary btn-md">Add Product</button>
            </div>
          </form>

          {/*show product*/}
          <div className="showProduct col-md-4">
            <h4>Products</h4>
            <div className="showProduct-group">
              <p>Product name</p>
              <p>product category</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default CreateProduct