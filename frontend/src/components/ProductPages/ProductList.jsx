import React from 'react'
import { useState } from 'react'
import Table from '../Table/Table'

const ProductList = () => {

  const [data] = useState([
    ['1','SSD','10','0.1','1000','5500','0','1','packing']
  ])

  const columns=['id','Product','Product Code','Weight(g)',"Buying Price",'Selling Price','Warranty (moths)','Quantity','Status'];
  
  return (
    <div>
      <h4>ProductList</h4>
      <Table
        data={data}
        columns={columns}
      />
    </div>
  )
}

export default ProductList