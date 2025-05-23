import express from 'express';
import './Services/config.js';
import { initRouter } from './Routes/routerIndex.js';
const app=express();
import cors from "cors";
import http from 'http';
import dotenv from 'dotenv';




dotenv.config();
const PORT = process.env.NODE_PORT;
// const PORT = 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
initRouter(app);

const onServerStart = () => {
    const message = `Server Listening On Port http://localhost:${PORT}`;
    console.log(message);
  };
  
app.listen(PORT, onServerStart); 
