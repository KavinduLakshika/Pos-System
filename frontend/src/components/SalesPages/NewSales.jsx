import { useState } from "react";
import Table from '../Table/Table'
import { PlusCircle } from 'lucide-react';

const NewSales = () => {

  const [data,] = useState([
    ["MaleeshaPa", "MaleeshaBalla@gmail.com"],
  ]);

  const columns = ["Name", "Email"];

  const btnName = 'Add New Sale'

  return (
    <div>
      <h2>New Sale</h2>
      <form action="">

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

          <div className="product-details">
            <input type="text" name="productNo" id="productNo" placeholder="Product No" />
          </div>
          <div className="product-details">
            <input type="text" name="productName" id="productName" placeholder="Product Name" />
          </div>
          <div className="product-details">
            <input type="text" name="price" id="price" placeholder="Cash Price" />
          </div>
          <div className="product-details">
            <input type="text" name="qty" id="qty" placeholder="Enter Quantity" />
          </div>
          <div className="product-details">
            <input type="text" name="discount" id="discount" placeholder="Product Discount" />
          </div>
          <div className="product-details">
            <input type="text" name="totalPrice" id="totalPrice" placeholder="Total Price" />
          </div>
          <div className="product-details">
            <textarea name="note" id="note" placeholder="Note and Warranty" cols="30" rows="3"></textarea>
          </div>
          <div className="product-details">
            <input type="checkbox" id="emi" name="emi" value="EMI" />
            <label for="emi">EMI</label>
          </div>
          <div className="product-details">
            <input type="text" name="emiNo" id="emiNo" placeholder="EMI/Serial Number" />
          </div>
        </div>

      </form>

      <div className="product-table">

        <Table
          data={data}
          columns={columns}
          btnName={btnName}
        />
      </div>
    </div>

  )
}

export default NewSales