import React from 'react'
import Table from '../Table/Table'

const ProductCategory = () => {

  const data=([])
  const columns = ["ID", 'Category','SuperCategory','Status'];

  const btnName = 'Add Category'

  return (
    <div>
      <div className="scrolling-container">
        <h4>ProductCategory</h4>
        
        <Table
          data={data}
          columns={columns}
          btnName={btnName}
        />
      </div>
    </div>
  )
}

export default ProductCategory