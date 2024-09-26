import { useState } from "react";
import Table from '../Table/Table'

const SalesHistory = () => {
  const [data,] = useState([
    ["MaleeshaPa", "MaleeshaBalla@gmail.com"],
  ]);

  const columns = ["Name", "Email"];

  const btnName = 'Add New Sale'

  return (
    <div>
      <h2>SalesHistory</h2>
      <div>
        <h2>New Sale</h2>
        <Table
          data={data}
          columns={columns}
          btnName={btnName}
        />
      </div>

    </div>
  )
}

export default SalesHistory