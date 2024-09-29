import React from 'react'
import { Route, Routes } from 'react-router-dom';
import NewRental from '../../components/RentalPages/NewRental';
import RentalInvoice from '../../components/RentalPages/NewRental';

const Rental = () => {
  return (
    <div>
        <Routes>
        <Route path="new" element={<NewRental />} />
        <Route path="history" element={<RentalInvoice/>} />
      </Routes>
    </div>
  )
}

export default Rental