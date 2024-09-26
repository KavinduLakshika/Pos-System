import { useState } from "react";
import { PlusCircle } from 'lucide-react';
import './NewSales.css';

const NewSales = () => {


  return (
    <div>
      <h2>New Sale</h2>
      <form action="" >
        <div className="sales-add-form">
          <div className="customer">
            <div className="subCaption">
              <p>Customer Details</p>
              <PlusCircle />
            </div>

            <div className="customer-details">
              <label htmlFor="">Customer Name</label>
              <input type="text" name="cusName" id="cusName" placeholder="Enter Name" />
            </div>
            <div className="customer-details">
              <label htmlFor="">Reference No</label>
              <input type="text" name="refNo" id="refNo" placeholder="Enter No" />
            </div>
          </div>

          <div className="product">
            <div className="subCaption">
              <p>Product Details</p>
            </div>
            <div className="row">
              <div className="product-details col-md-4 mb-2">
                <input type="text" name="productNo" className="form-control" id="productNo" placeholder="Product No" />
              </div>
              <div className="product-details col-md-8 mb-2">
                <input type="text" name="productName" className="form-control" id="productName" placeholder="Product Name" />
              </div>
              <div className="product-details col-md-3 mb-2">
                <input type="number" name="price" className="form-control" id="price" placeholder="Cash Price" />
              </div>
              <div className="product-details col-md-3 mb-2">
                <input type="text" name="qty" className="form-control" id="qty" placeholder="Enter Quantity" />
              </div>
              <div className="product-details col-md-3 mb-2">
                <input type="text" name="discount" className="form-control" id="discount" placeholder="Product Discount" />
              </div>
              <div className="product-details col-md-3 mb-2">
                <input type="text" name="totalPrice" className="form-control" id="totalPrice" placeholder="Total Price" />
              </div>
              <div className="product-details col-md-6 mb-2">
                <textarea name="note" className="form-control" id="note" placeholder="Note and Warranty" rows="3"></textarea>
              </div>
              <div className="product-details-checkbox col-md-1 mb-2">
                <input type="checkbox" id="emi" name="emi" value="EMI" />
                <label htmlFor="emi">EMI</label>
              </div>
              <div className="product-details col-md-5">
                <input type="text" name="emiNo" className="form-control" id="emiNo" placeholder="EMI/Serial Number" />
              </div>
            </div>
          </div>
        </div>
        <div className="sales-addbtn d-grid d-md-flex me-md-2 justify-content-end px-5">
          <button className="btn btn-primary btn-md mx-5">Add Product</button>
        </div>
      </form>

      <div className="product-table">
        
      </div>
    </div>

  )
}

export default NewSales