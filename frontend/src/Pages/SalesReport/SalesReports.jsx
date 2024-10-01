import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DailySales from '../../components/SalesReportPages/DailySales'
import SalesHistory from '../../components/SalesReportPages/SalesReportHistory'
// import SalesHistory from '../../components/SalesPages/SalesHistory'


const SalesReports = () => {
  return (
    <div>
      <Routes>
        <Route path="daily-summary" element={< DailySales/>} />
        <Route path="sales-history" element={< SalesHistory/>} />      
      </Routes>
    </div>
  )
}

export default SalesReports