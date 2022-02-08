import "./App.css";

import { useState } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

function App() {

  const fetchData = async() => {
    const response = await fetch("http://localhost:8000/sender-info/show");
    const parsedData = await response.json();
    const date = new Date(parsedData[0].date);
    console.log(date.getSeconds());
  }

  fetchData();

  let tempArray = [];
  let humArray = [];
  let hiArray= [];
  let dateArray = [];

  const state = {
    labels: ['January', 'February', 'March',
             'April', 'May'],
    datasets: [
      {
        label: 'Rainfall',
        fill: false,
        lineTension: 0.5,
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 2,
        data: [65, 59, 80, 81, 56]
      }
    ]
  }

  return (
    <div className="App">
      <Line
          data={state}
          options={{
            title:{
              display:true,
              text:'Average Rainfall per month',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
    </div>
  );
}

export default App;
