import SerialPort from "serialport";
import Readline from "@serialport/parser-readline"
import fetch from "node-fetch";

const port = new SerialPort("/dev/ttyUSB0", {baudRate: 9600});

const parser = port.pipe(new Readline({ delimiter: '\n' }));

port.on("open", () => {
    console.log("serial port open");
});

const fetchFunc = (jsonData) => {
    fetch('http://localhost:8000/sender-info/save', {
     method: 'POST',
     body: JSON.stringify(jsonData),
     headers: { 'Content-Type': 'application/json' }
    });
}

parser.on('data', async(data) => {
    const stringifiedData = data.toString();
    const fixedData = stringifiedData.replaceAll("'", "\"");
    const pureData = fixedData.replaceAll("\r"&&"\n", "").toString();
    const jsonData = JSON.parse(pureData);
    
    fetchFunc(jsonData);
    console.log(jsonData);
});