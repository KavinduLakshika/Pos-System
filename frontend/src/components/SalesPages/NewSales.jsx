import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import './NewSales.css';
import Form from '../../Models/Form/Form';
import Modal from 'react-modal';
import Table from '../Table/Table'

const NewSales = () => {
  const [formData, setFormData] = useState({
    name: '',
    refNo:'',
    productNo:'',
    productName:'',
    productPrice:'',
    qty:'',
    discount:'',
    totalPrice:'',
    productNote:'',
    emi:'',
    invoiceDate:'',
    invoiceDueDate:'',
    totalAmount:'',
    discountPrice:'',
    invoiceNote:'',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    closeModal(); // Close the modal on submit
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);

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

  const [data,] = useState([
    ['1', "MaleeshaPa", "5", '1'],
  ]);
  const Columns = ["id", 'product', 'qty', 'price'];

  return (
    <div>
      <h2>Sales Invoice</h2>
      <form action="" className='customer-form' >
        <div className="sales-add-form">
          <div className="customer">
            <div className="subCaption">
              <p>Customer Details</p>
              <button className='addCusBtn' type="button" onClick={openModal}><PlusCircle size={30} /></button>
            </div>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              contentLabel="New Customer Form"
            >
              <Form closeModal={closeModal} />
            </Modal>

            <div className="customer-details">
              <label htmlFor="">Customer Name</label>
              <input value={formData.name} type="text" className="form-control" name="cusName" id="cusName" placeholder="Enter Name"  />
            </div>
            <div className="customer-details">
              <label htmlFor="">Reference No</label>
              <input value={formData.refNo} type="text" className="form-control" name="refNo" id="refNo" placeholder="Enter No" />
            </div>
          </div>

          <div className="product">
            <div className="subCaption">
              <p>Product Details</p>
            </div>
            <div className="row">
              <div className="product-details col-md-4 mb-2">
                <input value={formData.productNo} type="text" name="productNo" className="form-control" id="productNo" placeholder="Product No" />
              </div>
              <div className="product-details col-md-8 mb-2">
                <input value={formData.productName} type="text" name="productName" className="form-control" id="productName" placeholder="Product Name" />
              </div>
              <div className="product-details col-md-3 mb-2">
                <input value={formData.productPrice} type="number" name="price" className="form-control" id="price" placeholder="Cash Price" onWheel={(e) => e.target.blur()} />
              </div>
              <div className="product-details col-md-3 mb-2">
                <input value={formData.qty} type="number" onWheel={(e) => e.target.blur()} name="qty" className="form-control" id="qty" placeholder="Enter Quantity" />
              </div>
              <div className="product-details col-md-3 mb-2">
                <input value={formData.discount} type="number" onWheel={(e) => e.target.blur()} name="discount" className="form-control" id="discount" placeholder="Product Discount" />
              </div>
              <div className="product-details col-md-3 mb-2">
                <input value={formData.totalPrice} type="number" onWheel={(e) => e.target.blur()} name="totalPrice" className="form-control" id="totalPrice" placeholder="Total Price" />
              </div>
              <div className="product-details col-md-6 mb-2">
                <textarea value={formData.productNote} name="note" className="form-control" id="note" placeholder="Note and Warranty" rows="3"></textarea>
              </div>
              <div className="product-details-checkbox col-md-1 mb-2">
                <input  type="checkbox" id="emi" name="emi" value="EMI" onChange={handleEmi} />
                <label htmlFor="emi">EMI</label>
              </div>
              {Emi && (
                <div className="product-details col-md-5">
                  <input value={formData.emi} type="text" name="emiNo" className="form-control" id="emiNo" placeholder="EMI/Serial Number" />
                </div>
              )}

            </div>
          </div>
        </div>
        <div className="sales-addbtn d-grid d-md-flex me-md-2 justify-content-end px-5">
          <button className="btn btn-primary btn-md">Add Product</button>
        </div>
      </form>

      <div className="product-table">
        <Table
          data={data}
          columns={Columns}
          showSearch={false}
          showButton={false}
          showActions={false}
        />

      </div>

      <form action="" className='payment-form'>

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
              <input value={formData.invoiceDate} type="datetime-local" className="form-control" name="invoiceDate" id="date" />
            </div>
            <div className="sales-person">
              <label htmlFor="" id='label'>Invoice Due Date</label>
              <input value={formData.invoiceDueDate} type="datetime-local" className="form-control" name="invoiceDueDate" id="date" />
            </div>
          </div>

          <div className="amount-box">
            <div className="amount-group">
              <label htmlFor="" id='label'>Total Amount</label>
              <input value={formData.totalAmount} type="number" className="form-control" name="totalAmount" id="readOnly" readOnly />
            </div>
            <div className="amount-group">
              <label htmlFor="" id='label'>Discount</label>
              <input value={formData.discountPrice} type="number" className="form-control" name="discountPrice" id="readOnly" readOnly />
            </div>
            <div className="amount-group">
              <label htmlFor="" id='label'>Invoice Note</label>
              <textarea value={formData.invoiceNote} name="invoiceNote" className="form-control" id="invoiceNote" rows={3}/>
            </div>
          </div>
        </div>

        <div className="payment-form-group">
          <div className="payment-details-box">
            <div className="payment-details">
              <label htmlFor="" id='label'>Payable Amount</label>
              <input  type="number" className="form-control" id='readOnly' name='amount' readOnly />
            </div>
            <div className="payment-details">
              <div className="payment-details-amount">
                <input  type="checkbox" name="" id="payment" onChange={handleCash} />
                <label htmlFor="" id='label'>Cash Payment</label>
              </div>

              {showCash && (
                <input type="number" className="form-control" id='cashAmount' name='cahAmount' placeholder='Cash Amount' onWheel={(e) => e.target.blur()} />
              )}
            </div>
            <div className="payment-details">
              <div className="payment-details-amount">
                <input  type="checkbox" name="" id="payment" onChange={handleCard} />
                <label htmlFor="" id='label'>Card Payment</label>
              </div>
              {showCard && (
                <input  type="number" className="form-control" id='' name='' placeholder='Card Payment' onWheel={(e) => e.target.blur()} />
              )}
            </div>
            <div className="payment-details">
              <div className="payment-details-amount">
                <input  type="checkbox" name="" id="payment" onChange={handleCheque} />
                <label htmlFor="" id='label'>Cheque Payment</label>
              </div>
              {showCheque && (
                <input  type="number" className="form-control" id='' name='' placeholder='Cheque Payment' onWheel={(e) => e.target.blur()} />
              )}
            </div>
            <div className="payment-details">
              <div className="payment-details-amount">
                <input  type="checkbox" name="" id="payment" onChange={handleBank} />
                <label htmlFor="" id='label'>Bank Payment</label>
              </div>
              {showBank && (
                <input  type="number" className="form-control" id='' name='' placeholder='Bank Payment' onWheel={(e) => e.target.blur()} />
              )}
            </div>
          </div>

          <div className="amount-box">
            <div className="amount-group">
              <label htmlFor="" id='label'>Paid Amount</label>
              <input  className="form-control" type="number" name="totalAmount" id="readOnly" readOnly />
            </div>
            <div className="amount-group">
              <label htmlFor="" id='label'>Due Amount</label>
              <input  className="form-control" type="number" name="discount" id="readOnly" readOnly />
            </div>
            <div className="amount-group">
              <label htmlFor="" id='label'>If Credit Sale</label>
            </div>
          </div>
        </div>

        <div className="payment-form-button  d-grid d-md-flex me-md-2 justify-content-end px-5">
          <button className='btn btn-danger btn-md' >Cancel</button>
          <button className='btn btn-primary btn-md '>Create invoice</button>
        </div>
      </form>
    </div>

  )
}

export default NewSales