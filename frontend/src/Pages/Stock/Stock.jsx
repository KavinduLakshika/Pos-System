import React from 'react'
import { Route,Routes } from 'react-router-dom'
import StockSummary from '../../components/StockPages/StockSummary';
import FinancialStock from '../../components/StockPages/FinancialStock';
import ProductPerformance from '../../components/StockPages/ProductPerformance';
import StockReport from '../../components/StockPages/StockReports';

const Stock = () => {
  return (
    <div>
        <h1>Stock</h1>
        <StockSummary/>
    </div>
  )
}

export default Stock