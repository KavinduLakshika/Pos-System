import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DailySales from './DailySales'
import SalesHistory from './SalesHistory'
// import DailySales from '../../components/SalesReportPages/DailySales'
// import SalesHistory from '../../components/SalesPages/SalesHistory'
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