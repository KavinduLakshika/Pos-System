import React from 'react';
import { Route, Routes } from 'react-router-dom';
import NewSales from '../../components/SalesPages/NewSales';
import SalesHistory from '../../components/SalesPages/SalesHistory';

const Sales = () => {
  return (
    <div>
      <h1>Sales</h1>
      <Routes>
        <Route path="new" element={<NewSales />} />
        <Route path="history" element={<SalesHistory />} />
      </Routes>
    </div>
  );
};

export default Sales;