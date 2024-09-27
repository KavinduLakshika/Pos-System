import React from 'react'
import { Route,Routes } from 'react-router-dom'
import CurrentStock from './CurrentStock'
import StockHistory from './StockHistory'


function StockReports() {
  return (
    <div>
        <Routes>
        <Route path="current-stock" element={< CurrentStock/>} />
        <Route path="stock-history" element={< StockHistory/>} />
        
      </Routes>
    </div>
    
  )
}

export default StockReports