import React from 'react';
import {Bar} from 'react-chartjs-2';

const Chart=({chartdata})=>{


    return(

        <div className="chart" style={{width:"100rem"}}>
           <Bar
  data={chartdata}
  width={100}
  height={300}
  options={{ maintainAspectRatio: false }}
/>

        </div>
    )
}
export default Chart;