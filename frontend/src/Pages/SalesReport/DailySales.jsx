import React  from 'react'
import Table from '../../components/Table/Table'

function DailySales() {

    const columns = ['#','Date & Time','Product Category','Product Name','Size','Customer Name','Customer Nic','Value','Sold Price','Job Done By','Profit/Loss'];
    const btnName = '+ New Sale';
    const data = [['1','2024-08-09 10.11AM', 'Gold','Ring','24K','Shiranthi Rajapaksha','123','50 000','80 000','Admin', '30 000']];

  return (
    <div>

        <div>
            <h2>Day Job Report</h2>

           
                <Table
                 search={'Search by Customer Name , Product Name'}
                 data={data}
                 columns={columns}
                 btnName={btnName}/>


            
        </div>
    </div>
  )
}

export default DailySales