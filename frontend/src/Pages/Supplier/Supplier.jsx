import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SupplierDetails from './SupplierDetails'
import SupplierPayments from './SupplierPayments'

function Supplier() {
  return (
    <div>
        <Routes>
            <Route path='supplier' element={<SupplierDetails/>}/>
            <Route path='supplier-payments' element={<SupplierPayments/>}/>

        </Routes>
    </div>
  )
}

export default Supplier