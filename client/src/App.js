import React, { useState, useEffect } from 'react';
import axios from 'axios'
import './App.css';
import Chart from './component/Chart'
import Pusher from 'pusher-js'


const App = (props) => {
  useEffect(()=>{
    console.log(0,dataPoints)
    getdata()

  },[])
  const [dataPoints, setDataPoints] = useState([])
  const [close,setClose]=useState(0)
  console.log(1,dataPoints)
  const [chartdata, setChartdata] = useState()
  console.log(2,chartdata)
const getdata=async()=>{
  try {
    const res = await axios.get("/poll")
    let Votes=res.data
    console.log(3,Votes);
    const totalVotes=Votes.length;
    console.log(4,totalVotes);
    const voteCounts=Votes.reduce((acc,vote)=>((acc[vote.car]=(acc[vote.car]|| 0)+parseInt(vote.points)),acc))
console.log(5,voteCounts)
let loaddata=[
  { label: 'BMW', y: voteCounts.BMW },
  { label: 'Jeep', y: voteCounts.Jeep },
  { label: 'Kia', y: voteCounts.Kia },
  { label: 'Audi', y: voteCounts.Audi },
  { label: 'Toyota', y: voteCounts.Toyota },
  { label: 'Peugeot', y: voteCounts.Peugeot},
  { label: 'Nissan', y: voteCounts.Nissan },
  { label: 'Dacia', y: voteCounts.Dacia},
  { label: 'Citroen', y: voteCounts.Citroen },
  { label: 'Chery', y: voteCounts.Chery },
  { label: 'Suzuki', y: voteCounts.Suzuki },

  { label: 'Somethingelse', y: voteCounts.Somethingelse }

]
      
setDataPoints(loaddata)
console.log(6,dataPoints)
setChartdata({
  labels: [0, ...loaddata.map(x => (x.label)).flat(1)],

  datasets: [
    {
      label: 'The Best Tunisian Car',
      backgroundColor: ['rgba(255,99,132,0.2)', 'rgba(255,99,132,0.2)', 'rgba(55,99,13,0.2)', 
      'rgba(828,9,2,0.2)','rgba(88,9,82,0.2)','rgba(88,19,3,0.2)','rgba(222,19,3,10.2)','rgba(38,19,3,2.2)','rgba(33,10,3,0.2)',
      'rgba(22,15,33,0.2)','rgba(66,19,35,5.2)','rgba(22,44,3,0.2)','rgba(8,63,3,9.2)'],
      
      data: [0, ...loaddata.map(x => (x.y)).flat(1)]
    }
  ]

})
console.log(7,chartdata)
Pusher.logToConsole=true
    const pusher = new Pusher('6306b08bda5cf3c2eb33', {
      cluster: 'eu'
    });
    const channel = pusher.subscribe('Cars-poll');
    channel.bind('Cars-vote', function(data) {
      loaddata= loaddata.map(x => x.label == data.car ? { ...x, y: x.y += data.points } : x)
      
      

      
      
setDataPoints(loaddata)
console.log(5,loaddata)
setChartdata({
  labels: [0, ...loaddata.map(x => (x.label)).flat(1)],

  datasets: [
    {
      label: 'Car Votes',
      backgroundColor: ['rgba(255,99,132,0.2)', 'rgba(255,99,132,0.2)', 'rgba(55,99,13,0.2)', 
      'rgba(828,9,2,0.2)','rgba(88,9,82,0.2)','rgba(88,19,3,0.2)','rgba(222,19,3,10.2)','rgba(38,19,3,2.2)','rgba(33,10,3,0.2)',
      'rgba(22,15,33,0.2)','rgba(66,19,35,5.2)','rgba(22,44,3,0.2)','rgba(8,63,3,9.2)'],

      
      data: [0, ...loaddata.map(x => (x.y)).flat(1)]
    }
  ]

})
})
  } catch (error) {
    console.error(error)
  }

  

}


 

  const [text, setText] = useState("")

  const handelChange = (e) => {
    setText(e.target.value)
console.log(8,text)
  }
  const handelSubmit = async (e) => {
   
    e.preventDefault();
  setClose(close+1)
    
if(!text){
  window.alert("pleaz choose one of your best car in Tunisia")
}if(close>5){
  window.alert("you have just 5 votes")
}
else{
    const head = {
      headers: {
        "Content-Type": "application/json"
      }
    }
    const data = { car: text }
    const body = JSON.stringify(data)
    console.log(body)
    try {
      const res = await axios.post("/poll", body, head)
      console.log(res.data)
    } catch (error) {
      console.error(error)
    }

  }
  }

  return (
    <>
      { console.log(66666,close==5 )}
      <section className="container">
        <div>
        <div>
        <h1>Tunisian Cars votes</h1>
        <p>Vote for your favorite cars you like in Tunisia</p>
        </div>
        <div  className="landing-inner" >
        <form onSubmit={e => handelSubmit(e)}  >
          <div className="fom-vote">
        <p className="item">
            <label>
            <img src="https://catalogue.automobile.tn/marques/3.png" alt="" style={{width:"50px"}} />
              <input name="Cars" type="radio" value="BMW" onChange={(e)=> handelChange(e)} checked={text === "BMW"} />
              <span>BMW</span>
            </label>
          </p>
          <p className="item">
            <label>
            <img src="https://catalogue.automobile.tn/marques/690.png" alt="" style={{width:"50px"}} />
              <input name="Cars" type="radio" value="Jeep" onChange={e => handelChange(e)} checked={text === "Jeep"} />
              <span>Jeep</span>
            </label>
          </p>
          <p className="item">
            <label>
            <img src="https://catalogue.automobile.tn/marques/11.png" alt="" style={{width:"50px"}} />
              <input name="Cars" type="radio" value="Opel" onChange={e => handelChange(e)} checked={text === "Opel"} />
              <span>Opel</span>
            </label>
          </p>
          <p className="item">
            <label>
            <img src="https://catalogue.automobile.tn/marques/7.png" alt="" style={{width:"50px"}} />
              <input name="Cars" type="radio" value="Kia" onChange={e => handelChange(e)} checked={text === "Kia"} />
              <span>Kia</span>
            </label>
          </p>
          <p className="item">
            <label>
            <img src="https://catalogue.automobile.tn/marques/2.png" alt="" style={{width:"50px"}} />
              <input name="Cars" type="radio" value="Audi" onChange={e => handelChange(e)} checked={text === "Audi"} />
              <span>Audi</span>
            </label>
          </p>
          <p className="item">
            <label>
            <img src="https://catalogue.automobile.tn/marques/207.png" alt="" style={{width:"50px"}} />
              <input name="Cars" type="radio" value="Toyota" onChange={e => handelChange(e)} checked={text === "Toyota"} />
              <span>Toyota</span>
            </label>
          </p>
          <p className="item">
            <label>
            <img src="https://catalogue.automobile.tn/marques/12.png" alt="" style={{width:"50px"}} />
              <input name="Cars" type="radio" value="Peugeot" onChange={e => handelChange(e)} checked={text === "Peugeot"} />
              <span>Peugeot</span>
            </label>
          </p>
          <p className="item">
            <label>
            <img src="https://catalogue.automobile.tn/marques/10.png" alt="" style={{width:"50px"}} />
              <input name="Cars" type="radio" value="Nissan" onChange={e => handelChange(e)} checked={text === "Nissan"} />
              <span>Nissan</span>
            </label>
          </p>
          <p className="item">
            <label>
            <img src="https://catalogue.automobile.tn/marques/64.png" alt="" style={{width:"50px"}} />
              <input name="Cars" type="radio" value="Dacia" onChange={e => handelChange(e)} checked={text === "Dacia"} />
              <span>Dacia</span>
            </label>
          </p>
          <p className="item">
            <label>
            <img src="https://catalogue.automobile.tn/marques/5.png" alt="" style={{width:"50px"}} />
              <input name="Cars" type="radio" value="Citroen" onChange={e => handelChange(e)} checked={text === "Citroen"} />
              <span>Citroen</span>
            </label>
          </p>
          <p className="item">
            <label>
            <img src="https://catalogue.automobile.tn/marques/1544.png" alt="" style={{width:"50px"}} />
              <input name="Cars" type="radio" value="Chery" onChange={e => handelChange(e)} checked={text === "Chery"} />
              <span>Chery</span>
            </label>
          </p>
          <p className="item">
            <label>
            <img src="https://catalogue.automobile.tn/marques/1246.png" alt="" style={{width:"50px"}} />
              <input name="Cars" type="radio" value="Suzuki" onChange={e => handelChange(e)} checked={text === "Suzuki"} />
              <span>Suzuki</span>
            </label>
          </p>
          <p className="item">
            <label>
            
              <input name="Cars" type="radio" value="Somethingelse" onChange={e => handelChange(e)} checked={text === "Somethingelse"} />
             
              <span>Somethingelse</span>
              
            </label>
          </p>
          </div>
          <div className="buttom">
         
         <input type="submit" value="Vote" className="btn" />

         
           </div>
        </form>
        <div className="chart-vote">
        <Chart chartdata={chartdata} />
        </div>
         </div>
         </div>
      </section>

     


    </>
  );
}

export default App;
