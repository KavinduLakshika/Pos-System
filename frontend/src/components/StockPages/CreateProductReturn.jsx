import React, { useState } from 'react';
import Modal from 'react-modal';
import Form from '../../Models/Form/Form';
import { PlusSquareIcon } from 'lucide-react';
import './Stock.css'
import Table from '../Table/Table'
import config from '../../config';

const CreateProductReturn = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [data,] = useState([]);
    const Columns = ["id", 'product', 'qty', 'price'];
    const [productSearch, setProductSearch] = useState('');
    const [customerSearch, setCustomerSearch] = useState('');
    const [formData, setFormData] = useState({
        cusName: '',
        invoiceNo: '',
        returnType: '',
        user: '',
        store: '',
        returnDate: '',
        note: '',
        productNo: '',
        productName: '',
        qty: '',
        productNote: '',
    });


    const fetchProductByName = async (name) => {
        try {
            const response = await fetch(`${config.BASE_URL}/product/productName/${name}`);
            if (response.ok) {
                const product = await response.json();
                setFormData(prevData => ({
                    ...prevData,
                    product: product.productId,
                    productNo: product.productCode,
                    productName: product.productName,
                    productNote: product.productDescription,
                }));
            } else {
                console.error('Product not found');
            }
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    };

    const fetchCustomerByName = async (name) => {
        try {
            const response = await fetch(`${config.BASE_URL}/customer/cusName/${name}`);
            if (response.ok) {
                const customer = await response.json();
                setFormData(prevData => ({
                    ...prevData,
                    customer: customer.cusId,
                    customerName: customer.cusName,
                }));
            } else {
                console.error('Customer not found');
            }
        } catch (error) {
            console.error('Error fetching customer:', error);
        }
    };

    const handleProductSearch = (e) => {
        setProductSearch(e.target.value);
        if (e.target.value.length > 2) {
            fetchProductByName(e.target.value);
        }
    };

    const handleCustomerSearch = (e) => {
        setCustomerSearch(e.target.value);
        if (e.target.value.length > 2) {
            fetchCustomerByName(e.target.value);
        }
    };

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };



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
                                    <input type="text" className="form-control" name="cusName" id="cusName" value={customerSearch} onChange={handleCustomerSearch} placeholder="Enter Name" />
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
                                <input type="number" className="form-control" onWheel={(e) => e.target.blur()} name="invoiceNo" value={formData.invoiceNo} id="" placeholder="" />
                            </div>
                            <div className="Stock-details  mb-2">
                                <label htmlFor="">Return Type</label>
                                <select name="returnType" id="" value={formData.returnType} className='form-control'>
                                    <option value="">select Type</option>
                                    <option value="Replace">Replace</option>
                                    <option value="Broken">Broken</option>
                                </select>
                            </div>
                            <div className="Stock-details">
                                <label htmlFor="">Person</label>
                                <input type="number" className="form-control" onWheel={(e) => e.target.blur()} name="user" value={formData.user} id="" placeholder="" />
                            </div>
                            <div className="Stock-details  mb-2">
                                <label htmlFor="">Store</label>
                                <select name="store" id="" value={formData.store} className='form-control'>
                                    <option value="">select store</option>
                                    <option value="Main">Main</option>
                                    <option value="Sub">Sub</option>
                                </select>
                            </div>
                            <div className="Stock-details  mb-2">
                                <label htmlFor="">Return Date</label>
                                <input type="Date" className="form-control" value={formData.returnDate} name="returnDate" id="" />
                            </div>
                            <div className="Stock-details  mb-2">
                                <label htmlFor="">Note</label>
                                <textarea className="form-control" name="note" id="" value={formData.note} placeholder="Add your note here" rows={3} />
                            </div>
                        </div>

                        <div className="product col-md-8">
                            <div className="row">
                                <div className="Stock-details col-md-4  mb-2">
                                    <label htmlFor="">Product Name</label>
                                    <input type="text" className="form-control" name="productName" value={productSearch} onChange={handleProductSearch} />
                                </div>
                                <div className="Stock-details col-md-4">
                                    <label htmlFor="">Product Number</label>
                                    <input type="text" className="form-control" value={formData.productNo} name="productNo" id="" />
                                </div>
                            </div>

                            <div className="row">
                                <div className="Stock-details col-md-4  mb-2">
                                    <label htmlFor="">Quantity</label>
                                    <input type="number" className="form-control" onWheel={(e) => e.target.blur()} name="qty" value={formData.qty} id="" />
                                </div>
                                <div className="Stock-details col-md-4  mb-2">
                                    <label htmlFor="">Note</label>
                                    <textarea className="form-control" name="productNote" value={formData.productNote} id="" rows={2} />
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
                                    showDate={false}
                                    showPDF={false}
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