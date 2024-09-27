import React from 'react'
import { Route,Routes } from 'react-router-dom'
import CurrentStock from '../../components/StockPages/CurrentStock'

function StockReports() {
  return (
    <div>
        <Routes>
        <Route path="current-stock" element={< CurrentStock/>} />
        
        
      </Routes>
    </div>
    
  )
}

export default StockReports