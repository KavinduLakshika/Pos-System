import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DailySales from './DailySales'

const SalesReports = () => {
  return (
    <div>
      <Routes>
        <Route path="daily-summary" element={< DailySales/>} />
        
        
      </Routes>
    </div>
  )
}

export default SalesReports