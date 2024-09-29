import React, { useState } from 'react'

const CreateProduct = () => {

  const [formData, setFormData] = useState({
    superCategory: 'select',
    productCategory: 'select',
    productName: '',
    productCode: '',
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
        <form action="" onSubmit={handleSubmit}>

          <div className="row">
            <div className="product-details col-md-4 mb-2">
              <label htmlFor="">Super category</label>
              <select name="superCategory" value={formData.superCategory} onChange={handleChange} id="" className="form-control">
                <option value="1">select</option>
                <option value="2">cat1</option>
                <option value="3">cat2</option>
              </select>
            </div>
            <div className="product-details col-md-4 mb-2">
              <label htmlFor="">Product category</label>
              <select name="producCategory" id="" onChange={handleChange} className="form-control">
                <option value="1">select</option>
                <option value="2">procat1</option>
                <option value="3">procat2</option>
              </select>
            </div>
          </div>

          <div className="row">
            <div className="product-details col-md-4 mb-2">
              <label htmlFor="">Product Name</label>
              <input onChange={handleChange} type="text" name='productName' id='' value={formData.productName} className='form-control' />
            </div>
            <div className="product-details col-md-4 mb-2">
              <label htmlFor="">Product Code</label>
              <input onChange={handleChange} type="text" name='productCode' id='' value={formData.productCode} className='form-control' />
            </div>
          </div>

          <div className="row">
            <div className="product-details col-md-4 mb-2">
              <label htmlFor="">Selling Price</label>
              <input onChange={handleChange} type="number" name='sellingPrice' onWheel={(e) => e.target.blur()} id='' value={formData.sellingPrice} className='form-control' />
            </div>
            <div className="product-details col-md-4 mb-2">
              <label htmlFor="">Min price</label>
              <input onChange={handleChange} type="number" name='minPrice' id='' onWheel={(e) => e.target.blur()} value={formData.minPrice} className='form-control' />
            </div>
          </div>

          <div className="row">
            <div className="product-details col-md-4 mb-2">
              <label htmlFor="">Warranty</label>
              <select name='warranty' id='' value={formData.warranty} className='form-control' onChange={handleChange} >
                <option value="1">No Warranty</option>
                <option value="1">3 Months</option>
                <option value="1">6 Months</option>
              </select>
            </div>
            <div className="product-details col-md-4 mb-2">
              <label htmlFor="">Description</label>
              <textarea onChange={handleChange} name='description' id='' value={formData.description} className='form-control' rows={2}></textarea>
            </div>
          </div>

          <div className="row">
            <div className="product-details col-md-4 mb-2">
              <label htmlFor="">Item Image</label>
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


      </div>
    </div>
  )
}

export default CreateProduct