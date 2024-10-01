import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from '../Table/Table'

const ReturnedProductList = () => {
    const [data,] = useState([
    ]);
    const Columns = ["id", 'No', 'Retun Date', 'Customer', 'Store', 'Total Item', 'handle by', 'Item Info'];
    const btnName = 'Create Return item';
    
    const navigate = useNavigate();

    const handleCreateRetun = () => {
        navigate('/stock/create');
    };


    return (
        <div>
            <div className="scrolling-container">
                <h4>Returned Product List</h4>
                <div className="">
                    <Table
                        data={data}
                        columns={Columns}
                        btnName={btnName}
                        onAdd={handleCreateRetun}
                        showActions={false}
                    />
                </div>
            </div>
        </div>
    )
}

export default ReturnedProductList