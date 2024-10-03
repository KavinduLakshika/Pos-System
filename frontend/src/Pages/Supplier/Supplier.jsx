import React from 'react'
import { Route, Routes } from 'react-router-dom'
import SupplierDetails from '../../components/SupplierPages/SupplierDetails'
import SupplierPayments from '../../components/SupplierPages/SupplierPayments'
import NewStock from '../../components/SupplierPages/NewStock'
import CreateStock from '../../components/SupplierPages/CreateStock'

function Supplier() {
  return (
    <div>
        <Routes>
            <Route path='create' element={<CreateStock/>}/>
            <Route path='supplier' element={<SupplierDetails/>}/>
            <Route path='new-stock' element={<NewStock/>}/>
            <Route path='supplier-payments' element={<SupplierPayments/>}/>

        </Routes>
    </div>
  )
}

export default Supplier