import React, { useState } from 'react';
import Modal from 'react-modal';
import Form from '../../Models/Form/Form';
import { PlusSquareIcon } from 'lucide-react';
import './Stock.css'
import Table from '../Table/Table'

const CreateProductReturn = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);


    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

    const [data,] = useState([
        ['1', "MaleeshaPa", "5", '1'],
      ]);
      const Columns = ["id", 'product', 'qty', 'price'];
    
    return (
        <div>
            <div className="scrolling-container">
                <h4>Create Product Return</h4>
                <form action="">
                    <div className="row">
                        <div className="customer col-md-4">
                            <div className='row'>
                                <div className="Stock-details col-md-10 mb-2">
                                    <label htmlFor="">Customer Name</label>
                                    <input type="text" className="form-control" name="name" id="cusName" placeholder="Enter Name" />
                                </div>
                                <button className='addCusBtn col-md-2 bg- mt-3' type="button" onClick={openModal}><PlusSquareIcon size={30} /></button>
                            </div>
                            <Modal
                                isOpen={modalIsOpen}
                                onRequestClose={closeModal}
                                contentLabel="New Customer Form"
                            >
                                <Form closeModal={closeModal} />
                            </Modal>
                            <div className="Stock-details">
                                <label htmlFor="">Invoice Number</label>
                                <input type="number" className="form-control" onWheel={(e) => e.target.blur()} name="invoiceNo" id="" placeholder="" />
                            </div>
                            <div className="Stock-details  mb-2">
                                <label htmlFor="">Return Type</label>
                                <select name="type" id="" className='form-control'>
                                    <option value="">select Type</option>
                                    <option value="Replace">Replace</option>
                                    <option value="Broken">Broken</option>
                                </select>
                            </div>
                            <div className="Stock-details  mb-2">
                                <label htmlFor="">Store</label>
                                <select name="store" id="" className='form-control'>
                                    <option value="">select store</option>
                                    <option value="Main">Main</option>
                                    <option value="Sub">Sub</option>
                                </select>
                            </div>
                            <div className="Stock-details  mb-2">
                                <label htmlFor="">Return Date</label>
                                <input type="Date" className="form-control" name="returnDate" id="" />
                            </div>
                            <div className="Stock-details  mb-2">
                                <label htmlFor="">Note</label>
                                <textarea className="form-control" name="note" id="" placeholder="Add your note here" rows={3} />
                            </div>
                        </div>

                        <div className="product col-md-8">
                            <div className="row">
                                <div className="Stock-details col-md-4">
                                    <label htmlFor="">Product Number</label>
                                    <input type="text" className="form-control" name="productNo" id="" />
                                </div>

                                <div className="Stock-details col-md-4  mb-2">
                                    <label htmlFor="">Product Name</label>
                                    <input type="text" className="form-control" name="productName" id="" />
                                </div>
                            </div>

                            <div className="row">
                                <div className="Stock-details col-md-4  mb-2">
                                    <label htmlFor="">Quantity</label>
                                    <input type="number" className="form-control" onWheel={(e) => e.target.blur()} name="qty" id="" />
                                </div>
                                <div className="Stock-details col-md-4  mb-2">
                                    <label htmlFor="">Note</label>
                                    <textarea className="form-control" name="productNote" id="" rows={2} />
                                </div>
                                <div className="col-md-4 mt-5">
                                    <button className="btn btn-primary btn-md">Add product</button>
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
                                />
                            </div>

                        </div>
                    </div>
                    <div className="d-grid d-md-flex me-md-2 justify-content-end px-5">
                        <button className="btn btn-danger btn-md mb-2">Clear</button>
                        <button className="btn btn-primary btn-md mb-2">Proceed</button>
                    </div>
                </form>
            </div>
        </div >
    )
}

export default CreateProductReturn