const mongoose = require("mongoose");

const info = new mongoose.Schema({
    temp: {
        type: Number,
        required: true
    },
    hum: {
        type: Number,
        required: true
    },
    heatIndex: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now().toString()
    }
});

const Info = mongoose.model("Info", info);

module.exports = Info;