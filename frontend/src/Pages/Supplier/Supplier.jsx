import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SupplierDetails from '../../components/SupplierPages/SupplierDetails'
import SupplierPayments from '../../components/SupplierPages/SupplierPayments'

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