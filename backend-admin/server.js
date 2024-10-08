import express from  'express';
import dotenv from 'dotenv'
import cors from 'cors'
import { authRouter } from './routes/authroutes.js';
import bodyParser from 'body-parser';


import path from "path"
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const result = dotenv.config();
const app = express();

app.use("/images", express.static("uploads"));
app.use(express.static(path.join(__dirname, "client", "build")));
app.use("/images", express.static(path.join(__dirname, "images")));

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
const PORT = process.env.port || 4000;
app.use("/api",authRouter)
app.listen(PORT,()=>{

    console.log(`server is running on ${PORT}`)
})