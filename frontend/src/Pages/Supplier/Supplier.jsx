import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SupplierDetails from './SupplierDetails'

function Supplier() {
  return (
    <div>
        <Routes>
            <Route path='supplier' element={<SupplierDetails/>}/>

        </Routes>
    </div>
  )
}

export default Supplier