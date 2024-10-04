import React, { useState } from 'react';
import Table from '../Table/Table';
import StoreForm from '../../Models/StoreModel/StoreForm';

const CreateStore = () => {
    const [showModal, setShowModal] = useState(false);

    const data = [];
    const columns = ['id', 'Department name', 'Address'];
    const btnName = 'Add Department'

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div>
            <div className="scrolling-container">
                <h4>Department</h4>
                <Table
                    data={data}
                    columns={columns}
                    btnName={btnName}
                    onAdd={openModal}
                />
                <StoreForm
                    showModal={showModal}
                    closeModal={closeModal}
                />
            </div>
        </div>
    )
}

export default CreateStore