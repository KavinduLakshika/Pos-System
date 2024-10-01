import React from 'react'
import { Route, Routes } from 'react-router-dom';
import CreateProductReturn from '../../components/StockPages/CreateProductReturn';
import ReturnedProductList from '../../components/StockPages/ReturnedProductList';
import StockAdjustment from '../../components/StockPages/StockAdjustment';
import StockAdjustmentHistory from '../../components/StockPages/StockAdjustmentHistory';

const Stock = () => {
  return (
    <div>
      <Routes>
        <Route path="create" element={<CreateProductReturn />} />
        <Route path="list" element={<ReturnedProductList />} />
        <Route path="adjustment" element={<StockAdjustment />} />
        <Route path="adjustment_history" element={<StockAdjustmentHistory />} />
      </Routes>
    </div>
  )
}

export default Stock