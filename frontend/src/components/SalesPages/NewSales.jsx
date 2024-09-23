import { useEffect, useState } from "react";
import Table from '../Table/Table'


const NewSales = () => {

  const [data,] = useState([
    ["Maleesha", "MaleeshaBalla@gmail.com"],
  ]);

  const columns = ["Name", "Email"];

  const btnName = 'add'

  return (
    <div>
      <h2>New Sale</h2>
      <Table
        data={data}
        columns={columns}
        btnName={btnName}
      />
    </div>
  )
}

export default NewSales