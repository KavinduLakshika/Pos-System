import React, { useState, useEffect } from 'react';
import { PlusCircle, ShoppingCart, User } from 'lucide-react';
import './NewSales.css';
import Form from '../../Models/Form/Form';
import Modal from 'react-modal';
import Table from '../Table/Table'
import config from '../../config';

const NewSales = ({ invoice }) => {
  const [data,] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [customerCreated, setCustomerCreated] = useState(false);

  const Columns = ["Customer Code", 'Customer Name', 'Customer Nic', 'Product Code','Product Name','Product Price','Quantity','Discount','Total Price'];
  const [formData, setFormData] = useState({
    cusName: '',
    cusNic: '',
    cusCode: '',
    productNo: '',
    productName: '',
    productPrice: '',
    qty: '',
    discount: '',
    totalPrice: '',
    productNote: '',
    emi: '',
  });

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    if ((name === 'cusNic' && value.length === 10) || value.length===12) { 
      try {
        const response = await fetch(`${config.BASE_URL}/customer/cusNIC/${value}`);
        if (response.ok) {
          const customerData = await response.json();
          setFormData(prevData => ({
            ...prevData,
            cusName: customerData.cusName,
            cusCode: customerData.cusCode
          }));
          setCustomerCreated(true);
        } else {
          console.log('Customer not found');
        }
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    }
    if (name === 'productNo' || name === 'productName') {
      fetchProductDetails(name, value);
    }
  };

  const fetchProductDetails = async (field, value) => {
    try {
      const response = await fetch(`${config.BASE_URL}/product?${field === 'productNo' ? 'code' : 'name'}=${value}`);
      if (response.ok) {
        const productData = await response.json();
        setFormData(prevData => ({
          ...prevData,
          productNo: productData.productCode,
          productName: productData.productName,
          productPrice: productData.sellingPrice
        }));
      } else {
        console.log('Product not found');
      }
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  }; 
  const handleCustomerCreated = (customerData) => {
    setFormData(prevData => ({
      ...prevData,
      cusName: customerData.cusName,
      cusNic: customerData.cusNIC,
      cusCode: customerData.cusCode
    }));
    setCustomerCreated(true);
    closeModal();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!customerCreated) {
    //   alert('Check Again');
    //   return;
    // }

    try {
      
    
      const productResponse = await fetch(`${config.BASE_URL}/product?code=${formData.productNo}&name=${formData.productName}`);
      if (!productResponse.ok) {
        const productError = await productResponse.json();
        throw new Error(productError.message || 'Failed to fetch product.');
      }
      const productData = await productResponse.json();

      const invoiceData = {
       
        productId: productData.productId,
        invoiceDate: new Date().toISOString(),
        cusName: formData.cusName,
        cusNIC: formData.cusNic,
        cusCode: formData.cusCode,
        productCode: formData.productCode,
        productName: formData.productName,
        productSellingPrice: formData.productPrice,
        invoiceQty: formData.qty,
        discount: formData.discount,
        totalAmount: formData.totalPrice,
        invoiceNote: formData.productNote,
        productEmi: formData.emi,
      };

      const response = await fetch(`${config.BASE_URL}/invoice`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(invoiceData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Invoice created:', data);
        closeModal();
      } else {
        const errorData = await response.json();
        console.error('Failed to create Invoice:', errorData);
        alert(errorData.error);
      }
    } catch (error) {
      console.error('Error:', error);
      // alert('An error occurred while creating the invoice.');
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const [Emi, setEmi] = useState(false);
  const handleEmi = (e) => {
    setEmi(e.target.checked)
  }

  const [showCard, setCard] = useState(false);
  const [showCash, setCash] = useState(false);
  const [showCheque, setCheque] = useState(false);
  const [showBank, setBank] = useState(false);

  const handleCard = (e) => {
    setCard(e.target.checked)
  }
  const handleCash = (e) => {
    setCash(e.target.checked)
  }
  const handleCheque = (e) => {
    setCheque(e.target.checked)
  }
  const handleBank = (e) => {
    setBank(e.target.checked)
  }




  return (
    <div>
      <div className="scrolling-container">
        <h4>Sales Invoice</h4>
        <form action="" onSubmit={handleSubmit} >
          <div className="customer-form">
            <div className="sales-add-form">
              <div className="customer">
                <div className="subCaption">

                  <p><User />Customer Details</p>
                  <button className='addCusBtn' type="button" onClick={openModal}><PlusCircle size={30} /></button>
                </div>
                <Modal
                  isOpen={modalIsOpen}
                  onRequestClose={closeModal}
                  contentLabel="New Customer Form"
                >
                  <Form closeModal={closeModal} onSave={handleCustomerCreated} />
                </Modal>

                <div className="customer-details">
                  <label htmlFor="">Customer Nic</label>
                  <input onChange={handleChange} value={formData.cusNic} type="text" className="form-control" name="cusNic" id="cusNic" placeholder="Enter Nic" />
                </div>

                <div className="customer-details">
                  <label htmlFor="">Customer Name</label>
                  <input onChange={handleChange} value={formData.cusName} type="text" className="form-control" name="cusName" id="cusName" placeholder="Enter Name" />
                </div>

                <div className="customer-details">
                  <label htmlFor="">Customer Code</label>
                  <input onChange={handleChange} value={formData.cusCode} type="text" className="form-control" name="cusCode" id="refNo" placeholder="Enter No" />
                </div>
              </div>

              <div className="product">
                <div className="subCaption">
                  <p><ShoppingCart /> Product Details</p>
                </div>
                <div className="row">
          <div className="product-details col-md-4 mb-2">
            <input 
              onChange={handleChange} 
              value={formData.productNo} 
              type="text" 
              name="productNo" 
              className="form-control" 
              id="productNo" 
              placeholder="Product Code" 
            />
          </div>
          <div className="product-details col-md-8 mb-2">
            <input 
              onChange={handleChange} 
              value={formData.productName} 
              type="text" 
              name="productName" 
              className="form-control" 
              id="productName" 
              placeholder="Product Name" 
            />
          </div>
          <div className="product-details col-md-3 mb-2">
            <input 
              onChange={handleChange} 
              value={formData.productPrice} 
              type="number" 
              name="productPrice" 
              className="form-control" 
              id="price" 
              placeholder="Product Price" 
              onWheel={(e) => e.target.blur()} 
            />
          </div>
                  <div className="product-details col-md-3 mb-2">
                    <input onChange={handleChange} value={formData.qty} type="number" onWheel={(e) => e.target.blur()} name="qty" className="form-control" id="qty" placeholder="Enter Quantity" />
                  </div>
                  <div className="product-details col-md-3 mb-2">
                    <input onChange={handleChange} value={formData.discount} type="number" onWheel={(e) => e.target.blur()} name="discount" className="form-control" id="discount" placeholder="Product Discount" />
                  </div>
                  <div className="product-details col-md-3 mb-2">
                    <input onChange={handleChange} value={formData.totalPrice} type="number" onWheel={(e) => e.target.blur()} name="totalPrice" className="form-control" id="totalPrice" placeholder="Total Price" />
                  </div>
                  <div className="product-details col-md-6 mb-2">
                    <textarea onChange={handleChange} value={formData.productNote} name="productNote" className="form-control" id="productNote" placeholder="Note and Warranty" rows="3"></textarea>
                  </div>
                  <div className="product-details-checkbox col-md-1 mb-2">
                    <input type="checkbox" id="emi" name="emi" value="EMI" onChange={handleEmi} />
                    <label htmlFor="emi">Imei</label>
                  </div>
                  {Emi && (
                    <div className="product-details col-md-5">
                      <input onChange={handleChange} value={formData.emi} type="text" name="emi" className="form-control" id="emi" placeholder="Imei/Serial Number" />
                    </div>
                  )}

                </div>
              </div>
            </div>
            <div className="sales-addbtn d-grid d-md-flex me-md-2 justify-content-end px-5">
              <button className="btn btn-primary btn-md">Add Product</button>
            </div>
          </div>

          <div className="product-table">
            <Table
              data={data}
              columns={Columns}
              showSearch={false}
              showButton={false}
              showActions={false}
              showRow={false}
              showDate={false}
              showPDF={false}
            />
          </div>

          <div className="payment-form">
            <div className="payment-form-group">
              <div className="sales-person-box">
                <div className="sales-person">
                  <label id='label'>Sales Person</label>
                  <select className="form-control">
                    <option value="" >Select</option>
                    <option value="1" >Admin</option>
                    <option value="2" >User</option>
                  </select>
                </div>
                <div className="sales-person">
                  <label htmlFor="" id='label'>Invoice Date</label>
                  <input type="datetime-local" className="form-control" name="invoiceDate" id="date" />
                </div>
                <div className="sales-person">
                  <label htmlFor="" id='label'>Invoice Due Date</label>
                  <input type="datetime-local" className="form-control" name="invoiceDueDate" id="date" />
                </div>
              </div>

              <div className="amount-box">
                <div className="amount-group">
                  <label htmlFor="" id='label'>Total Amount</label>
                  <input type="number" className="form-control" onWheel={(e) => e.target.blur()} name="totalAmount" id="readOnly" readOnly />
                </div>
                <div className="amount-group">
                  <label htmlFor="" id='label'>Discount</label>
                  <input type="number" className="form-control" onWheel={(e) => e.target.blur()} name="discountPrice" id="readOnly" readOnly />
                </div>
                <div className="amount-group">
                  <label htmlFor="" id='label'>Invoice Note</label>
                  <textarea name="invoiceNote" className="form-control" id="invoiceNote" rows={3} />
                </div>
              </div>
            </div>

            <div className="payment-form-group">
              <div className="payment-details-box">
                <div className="payment-details">
                  <label htmlFor="" id='label'>Payable Amount</label>
                  <input type="number" className="form-control" id='readOnly' name='amount' readOnly />
                </div>
                <div className="payment-details">
                  <div className="payment-details-amount">
                    <input type="checkbox" name="" id="payment" onChange={handleCash} />
                    <label htmlFor="" id='label'>Cash Payment</label>
                  </div>

                  {showCash && (
                    <input type="number" className="form-control" id='cashAmount' name='cahAmount' placeholder='Cash Amount' onWheel={(e) => e.target.blur()} />
                  )}
                </div>
                <div className="payment-details">
                  <div className="payment-details-amount">
                    <input type="checkbox" name="" id="payment" onChange={handleCard} />
                    <label htmlFor="" id='label'>Card Payment</label>
                  </div>
                  {showCard && (
                    <input type="number" className="form-control" id='' name='' placeholder='Card Payment' onWheel={(e) => e.target.blur()} />
                  )}
                </div>
                <div className="payment-details">
                  <div className="payment-details-amount">
                    <input type="checkbox" name="" id="payment" onChange={handleCheque} />
                    <label htmlFor="" id='label'>Cheque Payment</label>
                  </div>
                  {showCheque && (
                    <input type="number" className="form-control" id='' name='' placeholder='Cheque Payment' onWheel={(e) => e.target.blur()} />
                  )}
                </div>
                <div className="payment-details">
                  <div className="payment-details-amount">
                    <input type="checkbox" name="" id="payment" onChange={handleBank} />
                    <label htmlFor="" id='label'>Bank Payment</label>
                  </div>
                  {showBank && (
                    <input type="number" className="form-control" id='' name='' placeholder='Bank Payment' onWheel={(e) => e.target.blur()} />
                  )}
                </div>
              </div>

              <div className="amount-box">
                <div className="amount-group">
                  <label htmlFor="" id='label'>Paid Amount</label>
                  <input className="form-control" type="number" onWheel={(e) => e.target.blur()} name="totalAmount" id="readOnly" readOnly />
                </div>
                <div className="amount-group">
                  <label htmlFor="" id='label'>Due Amount</label>
                  <input className="form-control" type="number" onWheel={(e) => e.target.blur()} name="discount" id="readOnly" readOnly />
                </div>
                <div className="amount-group">
                  <label htmlFor="" id='label'>If Credit Sale</label>
                </div>
              </div>
            </div>

            <div className="payment-form-button  d-grid d-md-flex me-md-2 justify-content-end px-5">
              <button className='btn btn-danger btn-md mb-2' >Cancel</button>
              <button className='btn btn-primary btn-md mb-2'>Create invoice</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default NewSales