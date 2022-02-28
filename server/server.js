import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import router from "./routes/router.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/sender-info", router);


const PORT = process.env.PORT || 5000;

const checkConn = async () => {
	return await mongoose.connect(process.env.MONGO_URI);
};

const conn = checkConn();

if(conn !== null || conn !== undefined || conn !== ""){
	app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
}else{
	process.exit();
}
