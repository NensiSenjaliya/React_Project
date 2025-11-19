import express from 'express';
import './Services/config.js';
import { initRouter } from './Routes/routerIndex.js';
const app=express();
import cors from "cors";
import http from 'http';
import dotenv from 'dotenv';
import passport from "passport";
import session from "express-session";
import authRoutes from "./Routes/auth.js";
import "./Config/passport.js";

dotenv.config();
const PORT = process.env.NODE_PORT;
// const PORT = 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
initRouter(app);
app.use("/api/auth", authRoutes);
// Session setup (needed for passport)
app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: true,
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

const onServerStart = () => {
    const message = `Server Listening On Port http://localhost:${PORT}`;
    console.log(message);
  };
  
app.listen(PORT, onServerStart); 
