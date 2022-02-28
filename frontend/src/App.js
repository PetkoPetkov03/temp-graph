import "./App.css";

import React, { useState, useEffect } from "react";

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

const App = () => {
    
	// Managing state
  
	const [year, setYear] = useState(2022);

	const [month, setMonth] = useState(2);

	const [data, setData] = useState([]);

	let countTemp = 0;

	let countHum = 0;
  
	let countHI = 0;


	// fetch data from server
	const fetchData = async (year, month) => {
		const tempData = await fetch(
			`https://localhost:8000/sender-info/show/${year}/${month}`
		);

		const jsonifiedData = await tempData.json();
    
		const daysFromMonth = jsonifiedData.map(day => day.month === parseInt(month) && day.year === parseInt(year) ? day : null);
		setData(daysFromMonth);
	};

	let graphReadyDataTemp = [];
	let graphReadyDataHum = [];
	let graphReadyDataHI = [];

	useEffect(() => {
		fetchData(year, month);
	},[year, month]);

 
	// Get the days in the specified month and year
	const getDaysInMonth = new Date(year, month, 0).getDate();

	// order the days in the array for labels
	let labels = [];
	for(let i = 1; i <= getDaysInMonth; i++){
		labels.push(i);
	}

	const temp = data.map(temp => [temp.temp, temp.day]);
	const hum = data.map(hum => [hum.hum, hum.day]);
	const heatIndex = data.map(hin => [hin.heatIndex, hin.day]);

	const renderGraphTemp = async(countTemp) => {

		for(let i = 0; i < getDaysInMonth; i++){
			if(labels[i] === temp[countTemp][1]){
        
				graphReadyDataTemp.push(temp[countTemp][0]);
				countTemp = countTemp + 1;
			}else{
				graphReadyDataTemp.push(null);
			}
		}
	};
	const renderGraphHum = async(countHum) => {

		for(let i = 0; i < getDaysInMonth; i++){
			if(labels[i] === hum[countHum][1]){
        
				graphReadyDataHum.push(hum[countHum][0]);
				countHum = countHum + 1;
			}else{
				graphReadyDataHum.push(null);
			}
		}
	};

	const renderGraphHI = async(countHI) => {

		for(let i = 0; i < getDaysInMonth; i++){
			if(labels[i] === heatIndex[countHI][1]){
        
				graphReadyDataHI.push(heatIndex[countHI][0]);
				countHI = countHI + 1;
			}else{
				graphReadyDataHI.push(null);
			}
		}
	};
  
	renderGraphHum(countHum);
	renderGraphTemp(countTemp);
	renderGraphHI(countHI);

	console.log(countTemp, graphReadyDataTemp);

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
				data: graphReadyDataTemp,
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
				backgroundColor: "rgb(0,255,0)",
				borderColor: "rgb(0, 0, 255)",
				borderWidth: 2,
				data: graphReadyDataHum,
			},
		],
	};

	const stateIndex = {
		labels: labels,
		datasets: [
			{
				label: "Heat Index",
				fill: false,
				lineTension: 0.5,
				backgroundColor: "rgb(0,0,0)",
				borderColor: "rgb(0, 255, 0)",
				borderWidth: 2,
				data: graphReadyDataHI,
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
			<input
				type="button"
				value="Render"
				onClick={() => renderGraphTemp()}
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
			<Line
				data={stateIndex}
				options={{
					title: {
						display: true,
						text: "Heat Index",
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
};

export default App;
