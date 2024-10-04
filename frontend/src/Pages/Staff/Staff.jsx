import React from 'react'
import { Route, Routes } from 'react-router-dom'
import CreateStaff from '../../components/StaffPages/CreateStaff';
import CreateStore from '../../components/StaffPages/CreateStore';

const Staff = () => {

  return (
    <div>
      <Routes>
        <Route path="create-staff" element={< CreateStaff/>} />
        <Route path="create-store" element={< CreateStore/>} />      
      </Routes>
    </div>
  )
}

export default Staff;
