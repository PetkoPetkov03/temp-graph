import mongoose from "mongoose";

const d = new Date();

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
	day: {
		type: Number,
		required: true,
		default: d.getDate()
	},
	month: {
		type: Number,
		required: true,
		default: d.getMonth()+1
	},
	year: {
		type: Number,
		required: true,
		default: d.getFullYear()
	}
});

const Info = mongoose.model("Info", info);

export default Info;