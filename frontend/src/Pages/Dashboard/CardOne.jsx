import React from 'react'
import './Dashboard.css'

function CardOne({TodayTotal,YesterdayTotal,ThisMonthTotal,LastMonthTotal}) {
  return (
    <div>
        <div className='d-flex '>

          <div class="card bg-light mb-3 rounded-lg shadow-md relative cardOne ">
            <div class="card-header">Total Sales Earnings</div>
<br />
            <div class="row">
              <div class="card-body col-6 col-sm-3">
                <h5 class="card-title">Today</h5>
                <p class="card-text">{TodayTotal}</p>
              </div>

              <div class="card-body col-6 col-sm-3">
                <h5 class="card-title">This Month</h5>
                <p class="card-text">{ThisMonthTotal}</p>
              </div>
            </div>

            <div class="row">
              <div class="card-body col-6 col-sm-3">
                <h5 class="card-title">Yesterday</h5>
                <p class="card-text">{YesterdayTotal}</p>
              </div>

              <div class="card-body col-6 col-sm-3">
                <h5 class="card-title">Last Month</h5>
                <p class="card-text">{LastMonthTotal}</p>
              </div>
            </div>

          </div>
         

          
        </div>
        <div>
            
        </div>
    </div>
  )
}

export default CardOne