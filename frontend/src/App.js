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
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const [year, setYear] = useState(2022);

  const [month, setMonth] = useState(2);

  const [data, setData] = useState([]);

  const fetchData = async (year, month) => {
    const tempData = await fetch(
      `http://localhost:8000/sender-info/show/${year}/${month}`
    );

    const jsonifiedData = await tempData.json();
    
    const daysFromMonth = jsonifiedData.map(day => day.month === parseInt(month) && day.year === parseInt(year) ? day : null);
    setData(daysFromMonth);
  };

 

  const getDaysInMonth = new Date(year, month, 0).getDate();

  let labels = []
  for(let i = 1; i <= getDaysInMonth; i++){
    labels.push(i);
  }

  const stateTemp = {
    labels: labels,
    datasets: [
      {
        label: "Temperature",
        fill: false,
        lineTension: 0.5,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgb(255, 0, 0)",
        borderWidth: 2,
        data: data,
      },
    ],
  };

  const stateHum = {
    labels: labels,
    datasets: [
      {
        label: "Humidity",
        fill: false,
        lineTension: 0.5,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgb(255, 0, 0)",
        borderWidth: 2,
        data: data,
      },
    ],
  };

  return (
    <div className="App">
      <input
        type="text"
        name="year"
        id="year"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />
      <input
        type="text"
        name="month"
        id="month"
        value={month}
        placeholder="Month in integer"
        onChange={(e) => setMonth(e.target.value)}
      />
      <input
        type="button"
        value="Check"
        onClick={() => fetchData(year, month)}
      />

      <Line
        data={stateTemp}
        options={{
          title: {
            display: true,
            text: "Average Rainfall per month",
            fontSize: 20,
          },
          legend: {
            display: true,
            position: "right",
          },
        }}
      />

      <Line
        data={stateHum}
        options={{
          title: {
            display: true,
            text: "Average Rainfall per month",
            fontSize: 20,
          },
          legend: {
            display: true,
            position: "right",
          },
        }}
      />
    </div>
  );
}

export default App;
