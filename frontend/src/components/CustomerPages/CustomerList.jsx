import React from 'react'
import { useState } from "react";
import Table from '../Table/Table';

const CustomerList = () => {

  const [data]=useState([
    ['1','MaleeshaPa','pinkubura','6969696969','MaleeshaBalla@gmail.com','2000210021','0','Acvite']
  ])

  const columns=['id','Customer','Address','Phone','Email','NIC','Points','Status'];
  const btnName='New Customer'

  return (
    <div>
      <h1>Customer List</h1>
      <Table
      data={data}
      columns={columns}
      btnName={btnName}
      />
    </div>
  )
}

export default CustomerList