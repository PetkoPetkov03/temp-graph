const SerialPort = require("serialport");
const fetch = require("node-fetch");
const Readline = require("@serialport/parser-readline");

const port = new SerialPort("/dev/ttyUSB0", {baudRate: 950});

const parser = port.pipe(new Readline({ delimiter: '\n' }));

port.on("open", () => {
    console.log("serial port open");
});

parser.on('data', data => {
    const parsedData = JSON.parse(data);
    console.log("got sentance from arduino:", parsedData);
});